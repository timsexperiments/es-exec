import { checkShouldContinue } from '@es-exec/plugins-shared';
import { killProcess, logger } from '@es-exec/utils';
import { ChildProcess } from 'child_process';
import type { Plugin } from 'esbuild';
import { ESStartOptions } from './types';
import { start } from './utils';

const PLUGIN_NAME = 'es-start-plugin';

export default function ({
  script,
  child,
  env,
  runOnError = false,
  stopOnWarning = false,
  verbose = false,
}: ESStartOptions): Plugin {
  return {
    name: PLUGIN_NAME,
    setup: async function (build) {
      build.onEnd(async function ({ errors, warnings }) {
        if (child) killProcess(child, verbose);
        const shouldStop = !checkShouldContinue({
          errors,
          warnings,
          runOnError,
          stopOnWarning,
          verbose,
        });
        if (shouldStop) {
          return;
        }
        if (verbose) logger.info(`Starting "${script}".`);
        child = start(script, env);
      });
    },
  };
}

export * from './types';
