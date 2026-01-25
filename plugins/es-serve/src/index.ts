import { checkShouldContinue } from '@es-exec/plugins-shared';
import { killProcess, logger } from '@es-exec/utils';
import { ChildProcess } from 'child_process';
import { Plugin } from 'esbuild';
import { resolve } from 'path';
import { ESServeOptions } from './types';
import { determineMain, startModule } from './utils';

const PLUGIN_NAME = 'es-serve-plugin';

export default function ({
  main,
  env,
  execArgv,
  runOnError = false,
  stopOnWarning = false,
  verbose = false,
}: ESServeOptions = {}): Plugin {
  return {
    name: PLUGIN_NAME,
    setup: async function (build) {
      let child: ChildProcess;
      const { outdir, outfile } = build.initialOptions;
      if (main) {
        resolve(outdir ?? '', main);
      }
      if (!main && outfile) {
        main = resolve(outfile);
      }

      if (!main && !outfile) {
        build.initialOptions.metafile = true;
      }

      build.onEnd(async function ({ errors, warnings, metafile }) {
        if (child) {
          killProcess(child, verbose);
        }
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
        if (!main) {
          main = determineMain(Object.keys(metafile?.outputs ?? {}));
          if (main && verbose) {
            logger.warn(
              `Found main file [${main}]. If this is not the module that ` +
                "should be run after the build please sepcify the 'main' " +
                'module in the options.',
            );
          }
        }
        if (!main) {
          throw Error(
            "No 'main' or 'outfile' could be determined from the esbuild " +
              'config.',
          );
        }
        if (verbose) logger.info(`Starting module '${main}'`);
        child = startModule(main, env, execArgv);
      });
    },
  };
}

export * from './types';
