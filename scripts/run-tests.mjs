import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const testResult = spawnSync(process.execPath, ['--test'], { stdio: 'inherit' });
if (testResult.error || testResult.status !== 0) process.exit(testResult.status ?? 1);

const acceptance = fileURLToPath(new URL('./run-acceptance.mjs', import.meta.url));
const acceptanceResult = spawnSync(process.execPath, [acceptance], { stdio: 'inherit' });
process.exit(acceptanceResult.status ?? 1);
