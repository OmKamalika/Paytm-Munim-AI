import assert from "node:assert/strict";
import test from "node:test";
import { filterOutletRows, outletDataId, outletScopeLabel, questionOutletScope, sumOutletSales } from "../lib/outlet-scope.js";

const sales = [{ outlet: "Dadar", amountInr: 4980 }, { outlet: "Matunga", amountInr: 3120 }, { outlet: "Sion", amountInr: 2040 }];
const metrics = [{ id: "DAD", total: 10 }, { id: "MAT", total: 20 }, { id: "SIO", total: 30 }];

test("sales scope sums actual outlet rows", () => {
  assert.equal(sumOutletSales(sales, "all"), 10140);
  assert.equal(sumOutletSales(sales, "dadar"), 4980);
  assert.equal(sumOutletSales(sales, "matunga"), 3120);
  assert.equal(sumOutletSales(sales, "sion"), 2040);
});

test("sales names and backend outlet IDs use the same scope", () => {
  assert.deepEqual(filterOutletRows(sales, "matunga", row => row.outlet), [sales[1]]);
  assert.deepEqual(filterOutletRows(metrics, "matunga", row => row.id), [metrics[1]]);
  assert.equal(outletDataId("matunga"), "MAT");
  assert.equal(outletScopeLabel("matunga"), "Matunga");
  assert.equal(outletScopeLabel("all"), "All outlets");
});

test("unknown scope rejects instead of exposing all outlets", () => {
  for (const scope of ["unknown", "", "DAD", "all-outlets"]) {
    assert.throws(() => filterOutletRows(metrics, scope, row => row.id), /Unknown outlet scope/);
    assert.throws(() => sumOutletSales(sales, scope), /Unknown outlet scope/);
  }
});

test("missing selected outlet yields no rows and no other outlet sales", () => {
  assert.deepEqual(filterOutletRows(metrics.slice(0, 1), "sion", row => row.id), []);
  assert.equal(sumOutletSales(sales.slice(0, 1), "sion"), 0);
  assert.deepEqual(filterOutletRows([], "all", row => row.id), []);
});

test("all scope copies rows without mutating source records", () => {
  const scoped = filterOutletRows(metrics, "all", row => row.id);
  assert.deepEqual(scoped, metrics);
  assert.notEqual(scoped, metrics);
});

test("chat uses selected scope unless the user explicitly names another outlet", () => {
  assert.equal(questionOutletScope("How are my outlets doing?", "sion"), "sion");
  assert.equal(questionOutletScope("What were sales in the last seven days?", "sion"), "sion");
  assert.equal(questionOutletScope("What were Dadar sales today?", "sion"), "dadar");
  assert.equal(questionOutletScope("How is Matunga doing?", "dadar"), "matunga");
  assert.equal(questionOutletScope("How are all outlets doing?", "sion"), "all");
});
