import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { createHash, randomInt } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { resolveLaunchOptions } from './launch-config.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const options = resolveLaunchOptions(process.argv.slice(2), { root, env: {}, defaultHost: '127.0.0.1' });
// Never borrow a running demo's port. CI and local verification use 5194.
const port = process.argv.some((arg) => arg === '--port' || arg.startsWith('--port=')) ? options.port : 5194;
const base = `http://127.0.0.1:${port}`;
const temporary = await mkdtemp(path.join(os.tmpdir(), 'paytmunim-start-'));
const pin = Array.from({ length: 10 }, () => randomInt(10)).join('');
const pinHash = createHash('sha256').update(pin).digest('hex');

async function assertNoPrivateHash(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await assertNoPrivateHash(filename);
    else if (entry.isFile()) assert.equal((await readFile(filename)).includes(Buffer.from(pinHash)), false,
      'A local PIN hash must never appear in the built artifact.');
  }
}

async function stop(child) {
  if (child.exitCode !== null) return;
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore', windowsHide: true });
  } else {
    try { process.kill(-child.pid, 'SIGTERM'); } catch { /* already exited */ }
  }
  await Promise.race([new Promise((resolve) => child.once('exit', resolve)), delay(5000)]);
}

async function check(configured) {
  const envFile = path.join(temporary, configured ? 'configured.env' : 'empty.env');
  await writeFile(envFile, configured ? `DEMO_PIN_HASH=${pinHash}\n` : '', { mode: 0o600 });
  const env = { ...process.env };
  delete env.DEMO_PIN_HASH;
  const args = process.env.npm_execpath
    ? [process.env.npm_execpath, 'start', '--']
    : [path.join(root, 'scripts/start-demo.mjs')];
  // A clean clone exercises npm start's default missing .env.local path. An
  // existing owner's private setup is isolated with an empty temporary file.
  const privateInput = configured || existsSync(path.join(root, '.env.local')) ? ['--env-file', envFile] : [];
  const child = spawn(process.execPath, [...args, '--host', '127.0.0.1', '--port', String(port), ...privateInput], {
    cwd: root, env, detached: process.platform !== 'win32', windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let logs = '';
  const collect = (chunk) => { logs = (logs + chunk.toString()).slice(-16000); };
  child.stdout.on('data', collect);
  child.stderr.on('data', collect);
  let childError;
  child.once('error', (error) => { childError = error; });
  try {
    const deadline = Date.now() + 45000;
    let state;
    while (Date.now() < deadline) {
      if (childError) throw childError;
      if (child.exitCode !== null) throw new Error(`npm start exited with code ${child.exitCode}.`);
      try {
        const response = await fetch(`${base}/api/flows/state`, { signal: AbortSignal.timeout(1500) });
        if (response.ok) { state = await response.json(); break; }
      } catch { /* server is still starting */ }
      await delay(250);
    }
    assert.ok(state, 'The built demo must become ready within 45 seconds.');
    assert.equal(state.pinConfigured, configured, 'Local Worker PIN configuration did not reach the runtime.');
    const evaluation = await fetch(`${base}/api/guard/evaluate`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: { type: 'drawdown', lender_id: 'A', amount: 200000,
        destination_account: '**4029', invoice_id: 'GD-1182' } }), signal: AbortSignal.timeout(5000),
    });
    assert.equal(evaluation.status, 200);
    const guard = await evaluation.json();
    assert.equal(guard.checks.find((item) => item.id === 'pin_config')?.status,
      configured ? 'PASS' : 'NEEDS_VERIFICATION');
    for (const route of ['/', '/simulator']) {
      const response = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(10000) });
      assert.equal(response.status, 200, `${route} must render from the built Worker.`);
      await response.text();
    }
    await assertNoPrivateHash(path.join(root, 'dist'));
    console.log(`Built npm start: ${configured ? 'private PIN binding' : 'unconfigured fail-closed guard'} verified on loopback:${port}.`);
  } catch (error) {
    console.error(logs.replaceAll(pinHash, '[private hash]').replaceAll(pin, '[private PIN]'));
    throw error;
  } finally {
    await stop(child);
  }
}

try {
  try {
    await fetch(`${base}/api/flows/state`, { signal: AbortSignal.timeout(500) });
    throw new Error(`Port ${port} is already serving a process; choose an unused --port.`);
  } catch (error) {
    if (error instanceof Error && error.message.includes('already serving')) throw error;
  }
  await check(false);
  await check(true);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
