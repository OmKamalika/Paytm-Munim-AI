/** Process-local controls for the synthetic demo; no durable revocation claim. */
export function createDemoControl() {
  let paused = false;
  const state = () => ({ paused, scope: 'demo-session', durable: false });
  return {
    get: state,
    isPaused: () => paused,
    set(value) {
      if (typeof value !== 'boolean') throw new TypeError('paused must be a boolean');
      paused = value;
      return state();
    },
  };
}

export function getDemoControl() {
  const key = '__paytmunimDemoControl';
  if (!globalThis[key]) globalThis[key] = createDemoControl();
  return globalThis[key];
}
