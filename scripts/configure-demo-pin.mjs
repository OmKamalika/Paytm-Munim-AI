import { existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectEnv = fileURLToPath(new URL('../.env.local', import.meta.url));
// Some Windows PTYs report EPERM while closing after a successful hidden read.
process.stdin.on('error', () => {});

function hiddenInput(label) {
  return new Promise((resolve, reject) => {
    let value = '';
    const finish = (error) => {
      process.stdin.off('data', onData);
      process.stdout.write('\n');
      if (error) reject(error);
      else resolve(value);
    };
    const onData = (chunk) => {
      for (const character of chunk.toString('utf8')) {
        if (character === '\r' || character === '\n') return finish();
        if (character === '\u0003') return finish(new Error('Setup cancelled.'));
        if (character === '\u007f' || character === '\b') value = value.slice(0, -1);
        else if (/^[\x20-\x7e]$/.test(character) && value.length < 64) value += character;
      }
    };
    process.stdout.write(label);
    process.stdin.on('data', onData);
  });
}

async function sha256Hex(value) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

try {
  if (!process.stdin.isTTY || !process.stdout.isTTY || !process.stdin.setRawMode) {
    throw new Error('Run this setup in an interactive terminal so entry stays hidden.');
  }
  // Keep raw mode active across both prompts, including the tiny gap between
  // them, so confirmation input cannot be echoed by the terminal.
  process.stdin.setRawMode(true);
  process.stdin.resume();
  const first = await hiddenInput('Choose a demo PIN (6–12 digits; input hidden): ');
  if (!/^\d{6,12}$/.test(first)) throw new Error('Use 6–12 digits; nothing was saved.');
  const second = await hiddenInput('Confirm the demo PIN (input hidden): ');
  if (first !== second) throw new Error('Entries did not match; nothing was saved.');
  const hash = await sha256Hex(first);
  const old = existsSync(projectEnv) ? readFileSync(projectEnv, 'utf8') : '';
  const lines = old.split(/\r?\n/).filter((line) => line && !/^\s*DEMO_PIN_HASH\s*=/.test(line));
  lines.push(`DEMO_PIN_HASH=${hash}`);
  const temporary = `${projectEnv}.tmp`;
  writeFileSync(temporary, `${lines.join('\n')}\n`, { encoding: 'utf8', mode: 0o600 });
  renameSync(temporary, projectEnv);
  process.stdout.write('Demo PIN hash saved to the ignored local environment file. Restart npm run dev or npm start.\n');
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : 'Setup failed.'}\n`);
  process.exitCode = 1;
} finally {
  if (process.stdin.isTTY && process.stdin.setRawMode) {
    try { process.stdin.setRawMode(false); } catch { /* the process is exiting */ }
  }
  process.stdin.pause();
}
process.exit(process.exitCode ?? 0);
