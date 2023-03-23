import { checkShouldContinue } from '@es-exec/plugins-shared';
import { killProcess, logger } from '@es-exec/utils';
import { ChildProcess, fork } from 'child_process';
import { Plugin } from 'esbuild';
import { resolve } from 'path';

const PLUGIN_NAME = 'es-serve-plugin';

export interface ESServeOptions {
  /**
   * If main is not specified, the esbuild.BuildOptions.outfile should be used
   * instead.
   */
  main?: string;
  env?: NodeJS.ProcessEnv;
  execArgv?: string[];
  runOnError?: boolean;
  stopOnWarning?: boolean;
  verbose?: boolean;
}

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

function determineMain(outfiles: string[]) {
  const mainFile = /(bundle|index|main|server)\.[cm]?[js]x?$/;
  if (!outfiles) return undefined;
  if (outfiles.length === 1) {
    return outfiles[0];
  }
  return outfiles.map((outFile) => outFile).find((file) => mainFile.test(file));
}

function startModule(
  main: string,
  env?: NodeJS.ProcessEnv,
  execArgv?: string[],
) {
  const child = fork(main, { env, execArgv, stdio: 'inherit' })
    .on('spawn', function () {
      logger.info(`> ${main}`);
    })
    .on('error', function (error) {
      logger.error(error);
    })
    .on('close', function (code) {
      logger.info(`Completed '${main}' with exit code ${code}`);
      child.kill('SIGINT');
    });
  return child;
}
