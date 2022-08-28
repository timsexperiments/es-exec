import { ChildProcess, execSync } from 'child_process';
import { isWindows } from './env.js';
import logger from './logger.js';

/**
 * Kills child process.
 *
 * @param child The child process to kill.
 * @param verbose Whether to explain each action.
 * @returns true if the process was successfully killed.
 */
export function killProcess(child: ChildProcess, verbose = false) {
  const processId = child.pid ?? Infinity;
  const successMessage = `Successfully shut down process "${processId}".`;
  if (verbose) {
    logger.info(`Attempting to shut down process "${processId}".`);
  }
  if (isWindows) {
    try {
      if (processId) execSync('taskkill /pid ' + child.pid + ' /T /F');
      if (verbose) {
        logger.info();
      }
      return true;
    } catch (e: unknown) {
      if (
        (e as Error)?.message.includes(`The process "${processId}" not found`)
      ) {
        if (verbose) {
          logger.warn(
            `The requested process "${processId}" was not found. Assuming ` +
              'the process has already been shut down.',
          );
        }
        return true;
      }
    }
    if (verbose) {
      logger.error(`Could not shutdown child process "${processId}".`);
    }
    return false;
  }

  child.kill('SIGINT');
  if (verbose) {
    child.killed
      ? logger.info(successMessage)
      : logger.error(`Could not shut down child process "${processId}".`);
  }
  return child.killed;
}
