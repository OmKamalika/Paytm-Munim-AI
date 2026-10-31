/**
 * Synthetic outlet collection forecast. Payment history is a demand signal;
 * it contains neither product identities nor observed units on hand.
 */

const MODEL_VERSION = 'outlet-velocity-v1';
const DAY_MS = 86_400_000;

function dateMs(date) {
  const value = Date.parse(`${date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(value)) throw new RangeError('Expected an ISO calendar date.');
  return value;
}

function addDays(date, count) {
  return new Date(dateMs(date) + count * DAY_MS).toISOString().slice(0, 10);
}

function median(values) {
  if (!values.length) throw new RangeError('No historical values for the baseline.');
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function quantile(values, fraction) {
  if (!values.length) throw new RangeError('No historical residuals for the scenario range.');
  const sorted = [...values].sort((a, b) => a - b);
  const position = (sorted.length - 1) * fraction;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
}

function weekday(date) { return new Date(dateMs(date)).getUTCDay(); }
function clamp(value, low, high) { return Math.min(high, Math.max(low, value)); }
function sum(values) { return values.reduce((total, value) => total + value, 0); }

/** Both shifts must be closed. A missing shift is not treated as a zero day. */
export function aggregateDailyCollections(shiftRows, { from = null, through, outletIds = [], closureDates = [] } = {}) {
  if (!Array.isArray(shiftRows) || typeof through !== 'string') throw new RangeError('Shift rows and through date are required.');
  dateMs(through);
  if (from !== null && (typeof from !== 'string' || dateMs(from) > dateMs(through))) throw new RangeError('Expected source window is invalid.');
  const closuresSet = new Set(closureDates);
  const grouped = new Map();
  for (const row of shiftRows) {
    if (!row || typeof row.date !== 'string' || row.date > through) continue;
    dateMs(row.date);
    const key = `${row.outletId}|${row.date}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  }
  const complete = [];
  const closures = [];
  const incomplete = [];
  for (const [key, rows] of grouped) {
    const [outletId, date] = key.split('|');
    const morning = rows.filter((row) => row.shift === 'Morning');
    const evening = rows.filter((row) => row.shift === 'Evening');
    const completePair = rows.length === 2 && morning.length === 1 && evening.length === 1 &&
      rows.every((row) => Number.isSafeInteger(row.collectedTotalInr) && row.collectedTotalInr >= 0);
    const allZeroClosure = completePair && closuresSet.has(date) &&
      rows.every((row) => row.collectedTotalInr === 0 &&
        (row.status === 'CLOSED_BANDH' || row.status === 'CLOSED'));
    if (allZeroClosure) {
      closures.push({ date, outletId });
      continue;
    }
    const valid = completePair && rows.every((row) => row.status === 'CLOSED');
    if (!valid) {
      incomplete.push({ date, outletId, reason: 'missing_duplicate_or_unclosed_shift' });
      continue;
    }
    const amountInr = morning[0].collectedTotalInr + evening[0].collectedTotalInr;
    complete.push({ date, outletId, amountInr });
  }
  if (from !== null) {
    for (let timestamp = dateMs(from); timestamp <= dateMs(through); timestamp += DAY_MS) {
      const date = new Date(timestamp).toISOString().slice(0, 10);
      for (const outletId of outletIds) {
        if (!grouped.has(`${outletId}|${date}`)) incomplete.push({ date, outletId, reason: 'no_handover_rows' });
      }
    }
  }
  const byDateOutlet = (a, b) => a.date.localeCompare(b.date) || a.outletId.localeCompare(b.outletId);
  return {
    complete: complete.sort(byDateOutlet), closures: closures.sort(byDateOutlet),
    incomplete: incomplete.sort(byDateOutlet),
  };
}

function residualRange(history, targetWeekday) {
  const sameDay = history.filter((row) => weekday(row.date) === targetWeekday);
  const heldOut = sameDay.slice(-12);
  const residuals = [];
  for (const row of heldOut) {
    const earlier = sameDay.filter((candidate) => candidate.date < row.date).slice(-8);
    if (earlier.length < 8) continue;
    const baseline = median(earlier.map((candidate) => candidate.amountInr));
    if (baseline > 0) residuals.push(row.amountInr / baseline - 1);
  }
  if (residuals.length < 10) throw new RangeError('At least ten same-weekday historical residuals are required.');
  return { q10: quantile(residuals, 0.1), q90: quantile(residuals, 0.9), sampleDays: residuals.length };
}

/** Forecast seven future all-channel collection days, independent of the cash-plan fixture. */
export function buildOutletForecast(shiftRows, outletMetrics, {
  through = '2026-10-29', from = '2026-11-04', days = 7,
  sourceHash = null, closureDates = ['2025-07-09', '2026-01-12'],
} = {}) {
  if (!Array.isArray(outletMetrics) || !Number.isSafeInteger(days) || days < 1 || days > 31) throw new RangeError('Outlets and a valid forecast window are required.');
  if (dateMs(from) <= dateMs(through)) throw new RangeError('Forecast must start after the complete source history.');
  const firstHistoryDate = shiftRows.reduce((earliest, row) => row.date < earliest ? row.date : earliest, through);
  const daily = aggregateDailyCollections(shiftRows, {
    from: firstHistoryDate, through, closureDates, outletIds: outletMetrics.map((item) => item.id),
  });
  const recentStart = addDays(through, -27);
  const priorStart = addDays(through, -55);
  const priorEnd = addDays(through, -28);
  const outlets = outletMetrics.map((outlet) => {
    const history = daily.complete.filter((row) => row.outletId === outlet.id && row.date <= through);
    const recent = history.filter((row) => row.date >= recentStart && row.date <= through);
    const prior = history.filter((row) => row.date >= priorStart && row.date <= priorEnd);
    if (recent.length < 21 || prior.length < 21) throw new RangeError(`Insufficient recent complete days for ${outlet.id}.`);
    const recentAverage = sum(recent.map((row) => row.amountInr)) / recent.length;
    const priorAverage = sum(prior.map((row) => row.amountInr)) / prior.length;
    if (priorAverage <= 0) throw new RangeError(`Prior collection baseline is unavailable for ${outlet.id}.`);
    const trendFactor = Number(clamp(recentAverage / priorAverage, 0.85, 1.15).toFixed(4));
    const festivalFactor = outlet.diwaliWeek2025Multiplier;
    if (!Number.isFinite(festivalFactor) || festivalFactor <= 0) throw new RangeError(`Festival uplift is unavailable for ${outlet.id}.`);
    const projectedDays = Array.from({ length: days }, (_, index) => {
      const date = addDays(from, index);
      const sameWeekday = history.filter((row) => weekday(row.date) === weekday(date)).slice(-8);
      if (sameWeekday.length < 8) throw new RangeError(`Insufficient same-weekday history for ${outlet.id}.`);
      const weekdayBaselineInr = Math.round(median(sameWeekday.map((row) => row.amountInr)));
      const pointInr = Math.round(weekdayBaselineInr * trendFactor * festivalFactor);
      const residual = residualRange(history, weekday(date));
      const lowFactor = Math.max(0, 1 + Math.min(0, 1.25 * residual.q10));
      const highFactor = 1 + Math.max(0, 1.25 * residual.q90);
      return {
        date, label: 'estimate', pointInr,
        lowInr: Math.min(pointInr, Math.max(0, Math.round(pointInr * lowFactor))),
        highInr: Math.max(pointInr, Math.round(pointInr * highFactor)),
        components: {
          weekdayBaselineInr, trendFactor, festivalFactor,
          residualSampleDays: residual.sampleDays,
        },
      };
    });
    return {
      id: outlet.id, name: outlet.name, historyDays: history.length, trendFactor,
      festivalUplift: { factor: festivalFactor, source: '2025 Diwali week versus the prior four weeks of all-channel collections' },
      days: projectedDays,
      total: {
        pointInr: sum(projectedDays.map((day) => day.pointInr)),
        lowInr: sum(projectedDays.map((day) => day.lowInr)),
        highInr: sum(projectedDays.map((day) => day.highInr)),
      },
    };
  });
  return {
    synthetic: true, modelVersion: MODEL_VERSION,
    purpose: 'Outlet-level collection demand signal; no product sales or stock are observed.',
    source: {
      table: 'shift_handovers.csv', channel: 'all_channels', through,
      partialDayExcluded: addDays(through, 1), sourceHash,
      completeDayRule: 'Both Morning and Evening shifts CLOSED; known all-zero closure days excluded.',
      closuresExcluded: daily.closures.length,
      incompleteOutletDays: daily.incomplete.length,
    },
    window: { from, to: addDays(from, days - 1) },
    rangeLabel: 'Historical 10th–90th same-weekday residual scenario range, widened for Diwali; not calibrated confidence.',
    cashPlanRelationship: 'Separate scenario; does not replace the workbook cash-plan inflow or balance anchors.',
    outlets,
  };
}

/** Optional owner assumptions turn collection estimates into a unit-coverage proxy. */
export function calculateStockCoverage(forecast, input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new RangeError('Owner stock assumptions are required.');
  const { outletId, priceInr, revenueSharePercent, unitsOnHand, coverageDays } = input;
  if (typeof outletId !== 'string' || !Number.isSafeInteger(priceInr) || priceInr <= 0 ||
    !Number.isFinite(revenueSharePercent) || revenueSharePercent <= 0 || revenueSharePercent > 100 ||
    !Number.isSafeInteger(unitsOnHand) || unitsOnHand < 0 ||
    !Number.isSafeInteger(coverageDays) || coverageDays < 1 || coverageDays > 7) {
    throw new RangeError('Enter a valid outlet, positive whole-rupee unit price, revenue share over 0% to 100%, nonnegative whole units on hand, and 1–7 festival coverage days.');
  }
  if (input.skuLabel !== undefined && (typeof input.skuLabel !== 'string' || input.skuLabel.trim().length > 80)) {
    throw new RangeError('Product label must be at most 80 characters.');
  }
  const outlet = forecast?.outlets?.find((item) => item.id === outletId);
  if (!outlet) throw new RangeError('Choose a known outlet.');
  const selected = outlet.days.slice(0, coverageDays);
  if (selected.length !== coverageDays) throw new RangeError('Forecast does not cover the selected festival days.');
  const estimateUnits = (key) => Math.ceil(selected.reduce((total, day) => total + day[key], 0) * revenueSharePercent / 100 / priceInr);
  const estimatedDemandUnits = {
    low: estimateUnits('lowInr'), point: estimateUnits('pointInr'), high: estimateUnits('highInr'),
  };
  const gapsUnits = Object.fromEntries(Object.entries(estimatedDemandUnits).map(([key, units]) => [key, Math.max(0, units - unitsOnHand)]));
  const state = unitsOnHand < estimatedDemandUnits.low ? 'likely_shortage'
    : unitsOnHand > estimatedDemandUnits.high ? 'possible_surplus' : 'monitor';
  const explanation = state === 'likely_shortage'
    ? 'Even the low collection scenario implies more units than the owner entered as on hand. Review a reorder with the supplier.'
    : state === 'possible_surplus'
      ? 'The entered on-hand units exceed the high collection scenario. Review stock before buying more.'
      : 'The entered stock falls within the scenario range. Monitor sales and stock before changing the order.';
  return {
    synthetic: true, label: 'owner assumption + payment proxy', modelVersion: forecast.modelVersion,
    outlet: { id: outlet.id, name: outlet.name },
    skuLabel: input.skuLabel?.trim() || 'Selected product',
    horizon: { from: selected[0].date, to: selected.at(-1).date, coverageDays },
    assumptions: { priceInr, revenueSharePercent, unitsOnHand, coverageDays },
    estimatedDemandUnits, gapsUnits, state,
    recommendedReviewUnits: gapsUnits.point,
    explanation,
    execution: 'none',
  };
}
