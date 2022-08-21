import { release } from 'os';

export function setEnv(env: NodeJS.ProcessEnv) {
  Object.keys(env).forEach((envVar) => (process.env[envVar] = env[envVar]));
}

export const isWindows = process.platform === 'win32';

export const isWsl = (function () {
  if (process.platform !== 'linux') return false;

  const releaseVersion = release().toUpperCase();
  if (releaseVersion.includes('MICROSOFT') || releaseVersion.includes('WSL')) {
    return true;
  }

  return false;
})();
