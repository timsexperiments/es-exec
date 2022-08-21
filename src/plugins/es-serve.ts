import { ChildProcess, fork } from 'child_process';
import { Plugin } from 'esbuild';
import { resolve } from 'path';
import logger from '../utils/logger.js';
import { killProcess } from '../utils/process.js';
import { checkShouldContinue } from './shared.js';

const PLUGIN_NAME = 'es-serve-plugin';

export interface EsStartOptions {
  /**
   * If main is not specified, the esbuild.BuildOptions.outfile should be used
   * instead.
   */
  main: string;
  env?: NodeJS.ProcessEnv;
  runOnError?: boolean;
  stopOnWarning?: boolean;
  verbose?: boolean;
}

export default function ({
  main = 'outfile',
  env,
  runOnError = false,
  stopOnWarning = false,
  verbose = false,
}: EsStartOptions): Plugin {
  return {
    name: PLUGIN_NAME,
    setup: async function (build) {
      let child: ChildProcess;
      const { outdir, outfile } = build.initialOptions;
      if (main !== 'outfile') {
        resolve(outdir ?? '', main);
      }
      if (main === 'outfile' && outfile) {
        main = resolve(outfile);
      }
      console.log('main: ' + main);
      console.log('outfile: ' + outfile);
      if (main === 'outfile')
        throw Error("No 'main' or 'outfile' was provided to esbuild.");

      build.onEnd(async function ({ errors, warnings }) {
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
