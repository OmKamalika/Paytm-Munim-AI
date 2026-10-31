import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolveLaunchOptions, workerArguments } from '../scripts/launch-config.mjs';

const root = path.resolve('work/launch-fixture');

test('portable servers bind only to loopback and use the same default port', () => {
  const options = resolveLaunchOptions([], { root, env: {} });
  assert.equal(options.host, '127.0.0.1');
  assert.equal(options.port, 5173);
  assert.equal(options.envFile, path.join(root, '.env.local'));
});

test('an explicit host and port replace environment defaults without duplicate flags', () => {
  const options = resolveLaunchOptions(['--host', '127.0.0.1', '--port=5194'], {
    root, env: { DEMO_HOST: '0.0.0.0', PORT: '8787' },
  });
  assert.equal(options.host, '127.0.0.1');
  assert.equal(options.port, 5194);
  const args = workerArguments(options, root);
  assert.equal(args.filter((value) => value === '--port').length, 1);
  assert.equal(args[args.indexOf('--port') + 1], '5194');
});

test('an explicit private environment file becomes an absolute worker secret input', () => {
  const options = resolveLaunchOptions(['--env-file', 'work/private.env'], { root, env: {} });
  const args = workerArguments(options, root);
  assert.equal(args[args.indexOf('--env-file') + 1], path.join(root, 'work/private.env'));
  assert.equal(args[args.indexOf('--config') + 1], path.join(root, 'dist/server/wrangler.json'));
});

test('invalid listening settings stop before starting a server', () => {
  for (const port of ['0', '-1', '65536', '5194oops', '']) {
    assert.throws(() => resolveLaunchOptions([`--port=${port}`], { root, env: {} }), /port/i);
  }
  assert.throws(() => resolveLaunchOptions(['--host='], { root, env: {} }), /host/i);
  assert.throws(() => resolveLaunchOptions(['--env-file'], { root, env: {} }), /env-file/i);
});

test('local worker configuration carries a file path and never a hash as a command argument', () => {
  const privateHash = crypto.randomUUID().replaceAll('-', '').repeat(2);
  const options = resolveLaunchOptions([], { root, env: { DEMO_PIN_HASH: privateHash } });
  const args = workerArguments(options, root);
  assert.equal(args.includes(privateHash), false);
  assert.equal(args[args.indexOf('--env-file') + 1], path.join(root, '.env.local'));
  assert.ok(args.includes('--local'));
});

test('a missing local environment file reaches Wrangler without becoming a Node startup option', () => {
  const script = fileURLToPath(new URL('../scripts/start-demo.mjs', import.meta.url));
  const result = spawnSync(process.execPath, ['--', script, '--env-file', 'work/nonexistent-test.env', '--help'], {
    encoding: 'utf8', timeout: 15000,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /wrangler dev/);
});
