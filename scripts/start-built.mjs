// Starts the production build locally (after `npm run build`).
//
// The owner PIN hash lives only in the ignored .env.local written by
// `npm run configure:pin`. Wrangler reads worker variables from a .dev.vars
// file beside the built config, so the hash is copied to the ignored
// dist/server/.dev.vars (owner-only permissions) on each start. No PIN or
// hash is ever committed. Without it, owner approvals fail closed.
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import './sites-env.mjs';

const config = 'dist/server/wrangler.json';
if (!existsSync(config)) {
  process.stderr.write('No production build found. Run `npm run build` first.\n');
  process.exit(1);
}
const devVars = 'dist/server/.dev.vars';
const hash = existsSync('.env.local')
  ? readFileSync('.env.local', 'utf8').split(/\r?\n/).map((line) => line.match(/^\s*DEMO_PIN_HASH\s*=\s*([a-f0-9]{64})\s*$/i)?.[1]).find(Boolean)
  : undefined;
if (hash) writeFileSync(devVars, `DEMO_PIN_HASH=${hash}\n`, { encoding: 'utf8', mode: 0o600 });
else {
  rmSync(devVars, { force: true });
  process.stderr.write('No owner PIN hash found in .env.local: run `npm run configure:pin`, or owner approvals will fail closed.\n');
}

const args = ['./node_modules/wrangler/bin/wrangler.js', 'dev', '--config', config, '--local',
  '--persist-to', '.wrangler/state', '--ip', process.env.HOST ?? '127.0.0.1', '--port', process.env.PORT ?? '8787', '--inspector-port', '0'];
const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
process.exit(result.status ?? 1);
