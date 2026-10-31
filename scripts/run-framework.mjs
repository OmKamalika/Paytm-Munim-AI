import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { readExecutionProfile } from "./execution-profile.mjs";
import { resolveLaunchOptions } from "./launch-config.mjs";

const [command, ...args] = process.argv.slice(2);
if (!["dev", "build"].includes(command)) throw new Error("Expected dev or build.");
const projectRoot = fileURLToPath(new URL("../", import.meta.url));
process.chdir(projectRoot);
const managedLinux = readExecutionProfile() === "managed-linux";
const options = command === "dev" ? resolveLaunchOptions(args, {
  root: projectRoot, defaultHost: managedLinux ? "0.0.0.0" : "127.0.0.1",
}) : null;
// The owner-chosen demo PIN is local-only and is loaded into the dev process.
// Never load it during a build, where a bundler might capture environment data.
if (options && existsSync(options.envFile)) process.loadEnvFile(options.envFile);
if (command === "build") delete process.env.DEMO_PIN_HASH;

if (managedLinux && command === "build") {
  const result = spawnSync("bash", [
    fileURLToPath(new URL("./build-verified.sh", import.meta.url)), ...args,
  ], { stdio: "inherit" });
  if (result.error) throw result.error;
  process.exit(result.status ?? 1);
}

// Import in this process so the preview owner retains its PID and signals.
const cli = new URL(managedLinux
  ? "../node_modules/vite/bin/vite.js"
  : "../node_modules/vinext/dist/cli.js", import.meta.url);
process.argv = [process.execPath, fileURLToPath(cli), command,
  ...(options ? [managedLinux ? "--host" : "--hostname", options.host,
    "--port", String(options.port), ...options.passthrough] : args)];
await import(cli.href);
