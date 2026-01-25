import { isWindows, logger } from '@es-exec/utils';
import { spawn } from 'child_process';

const WINDOWS_SHELL = process.env.comspec || 'cmd';

export const shellFlags = isWindows ? '/d /s /c' : '-c';
export const shell = isWindows ? WINDOWS_SHELL : 'sh';

export function start(script: string, env?: NodeJS.ProcessEnv) {
  const args = [shellFlags, `${script}`];
  logger.info([shell, ...args].join(' '));
  const child = spawn(shell, args, {
    env,
    stdio: 'inherit',
    windowsVerbatimArguments: isWindows,
  })
    .on('error', function (error) {
      logger.error(error);
    })
    .on('close', function (code) {
      logger.info(`Completed '${script}' with exit code ${code}`);
      child.kill('SIGINT');
    });
  return child;
}
