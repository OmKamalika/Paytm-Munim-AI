import path from 'node:path';

// Keep local development and the built Worker on the same explicit interface.
// CLI values take precedence, so a second demo never silently changes ports.
export function resolveLaunchOptions(args, { root, env = process.env, defaultHost = '127.0.0.1' }) {
  let host = env.DEMO_HOST ?? defaultHost;
  let port = env.PORT ?? '5173';
  let envFile = '.env.local';
  const passthrough = [];
  for (let index = 0; index < args.length; index += 1) {
    const [flag, ...inline] = args[index].split('=');
    const kind = new Map([
      ['--host', 'host'], ['--hostname', 'host'], ['--ip', 'host'], ['-H', 'host'],
      ['--port', 'port'], ['-p', 'port'], ['--env-file', 'env-file'],
    ]).get(flag);
    if (!kind) { passthrough.push(args[index]); continue; }
    const value = inline.length ? inline.join('=') : args[++index];
    if (value === undefined || value.startsWith('--')) throw new Error(`Provide a value for ${flag}.`);
    if (kind === 'host') host = value;
    else if (kind === 'port') port = value;
    else {
      if (!value) throw new Error('Provide a path for --env-file.');
      envFile = value;
    }
  }
  if (typeof host !== 'string' || !host || /\s/.test(host)) throw new Error('Provide a valid listening host.');
  if (!/^\d+$/.test(String(port)) || Number(port) < 1 || Number(port) > 65535) {
    throw new Error('The listening port must be an integer from 1 to 65535.');
  }
  return { host, port: Number(port), envFile: path.resolve(root, envFile), passthrough };
}

export function workerArguments(options, root) {
  return [
    'dev', '--config', path.join(root, 'dist/server/wrangler.json'),
    '--local', '--persist-to', path.join(root, '.wrangler/state'),
    '--ip', options.host, '--port', String(options.port), '--inspector-port', '0',
    // Wrangler resolves implicit .env files beside dist/server/wrangler.json.
    // An absolute, explicit path supplies local Worker secrets without adding
    // a PIN hash to the build output, process arguments, or Wrangler config.
    '--env-file', options.envFile, ...options.passthrough,
  ];
}
