import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { projectRoot } from './sites-env.mjs';
import { resolveLaunchOptions, workerArguments } from './launch-config.mjs';

const options = resolveLaunchOptions(process.argv.slice(2), { root: projectRoot });
if (!options.passthrough.includes('--help') && !existsSync(path.join(projectRoot, 'dist/server/wrangler.json'))) {
  throw new Error('The built demo is missing. Run npm run build before npm start.');
}
const child = spawn(process.execPath, [
  // Node 22 scans --env-file early. Stop its option parsing explicitly and
  // invoke the pinned Wrangler CLI with the flags its wrapper normally adds.
  '--no-warnings', '--experimental-vm-modules', '--',
  path.join(projectRoot, 'node_modules/wrangler/wrangler-dist/cli.js'),
  ...workerArguments(options, projectRoot),
], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: {
    ...process.env,
    CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV: 'true',
    CLOUDFLARE_INCLUDE_PROCESS_ENV: 'false',
  },
});
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => child.kill(signal));
child.once('error', (error) => { console.error(error.message); process.exitCode = 1; });
child.once('exit', (code, signal) => { process.exitCode = code ?? (signal ? 1 : 0); });
