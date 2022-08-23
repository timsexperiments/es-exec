import { release } from 'os';

/**
 * Sets the `process.env` keys with the values from `env`.
 *
 * @param env The environment variables to set on the `process.env`.
 */
export function setEnv(env: NodeJS.ProcessEnv) {
  Object.keys(env).forEach((envVar) => (process.env[envVar] = env[envVar]));
}

/** True if the process platform is windows. */
export const isWindows = process.platform === 'win32';

/** Whether the process is running in WSL. */
export const isWsl = (function () {
  if (process.platform !== 'linux') return false;

  const releaseVersion = release().toUpperCase();
  if (releaseVersion.includes('MICROSOFT') || releaseVersion.includes('WSL')) {
    return true;
  }

  return false;
})();
