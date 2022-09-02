import { logger } from '@es-exec/utils';

export interface CheckShouldContinueArgs {
  stopOnWarning: boolean;
  runOnError: boolean;
  verbose: boolean;
  errors: unknown[];
  warnings: unknown[];
}

export function checkShouldContinue({
  errors,
  runOnError,
  stopOnWarning,
  verbose,
  warnings,
}: CheckShouldContinueArgs) {
  if (!runOnError && errors.length) {
    if (verbose) {
      logger.error(
        `There were [${errors.length}] build errors that are ` +
          'preventing start up.',
      );
    }
    return false;
  }
  if (stopOnWarning && warnings.length) {
    if (verbose) {
      logger.error(
        `There are [${warnings.length}] build warnings that are ` +
          'preventing start up. If you do not want to prevent start up ' +
          'remove the "stopOnWarning" flag.',
      );
    }
    return false;
  }
  return true;
}
