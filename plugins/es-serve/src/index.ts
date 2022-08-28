import { checkShouldContinue } from '@es-exec/plugins-shared';
import { killProcess, logger } from '@es-exec/utils';
import { ChildProcess, fork } from 'child_process';
import { OutputFile, Plugin } from 'esbuild';
import { resolve } from 'path';

const PLUGIN_NAME = 'es-serve-plugin';

export interface EsServeOptions {
  /**
   * If main is not specified, the esbuild.BuildOptions.outfile should be used
   * instead.
   */
  main?: string;
  env?: NodeJS.ProcessEnv;
  runOnError?: boolean;
  stopOnWarning?: boolean;
  verbose?: boolean;
}

export default function ({
  main,
  env,
  runOnError = false,
  stopOnWarning = false,
  verbose = false,
}: EsServeOptions): Plugin {
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

      build.onEnd(async function ({ outputFiles, errors, warnings }) {
        if (!main) {
          main = determineMain(outputFiles);
        }
        if (!main) {
          throw Error(
            "No 'main' or 'outfile' could be determined from the esbuild " +
              'config.',
          );
        }
        if (child) {
          killProcess(child, verbose);
        }
        checkShouldContinue({
          errors,
          warnings,
          runOnError,
          stopOnWarning,
          verbose,
        });
        if (verbose) logger.info(`Starting module '${main}'`);
        startModule(main, env);
      });
    },
  };
}

function determineMain(outfiles?: OutputFile[]) {
  const mainFile = /(bundle|index|main|server)\.[cm]?[js]x?$/;
  if (!outfiles) return undefined;
  if (outfiles.length === 1) {
    return outfiles[0].path;
  }
  return outfiles
    .map((outFile) => outFile.path)
    .find((file) => mainFile.test(file));
}

function startModule(main: string, env?: NodeJS.ProcessEnv) {
  logger.info(`> ${main}`);
  const child = fork(main, { env, stdio: 'inherit' })
    .on('error', function (error) {
      logger.error(error);
    })
    .on('close', function (code) {
      logger.info(`Completed '${main}' with exit code ${code}`);
      child.kill('SIGINT');
    });
  return child;
}
