import { ChildProcess, spawn } from 'child_process';
import type { Plugin } from 'esbuild';
import { isWindows } from '../utils/env.js';
import logger from '../utils/logger.js';
import { killProcess } from '../utils/process.js';
import { checkShouldContinue } from './shared.js';

const WINDOWS_SHELL = process.env.comspec || 'cmd';

const shellFlags = isWindows ? '/d /s /c' : '-c';
const shell = isWindows ? WINDOWS_SHELL : 'sh';

const PLUGIN_NAME = 'es-start-plugin';

export interface EsStartOptions {
  child?: ChildProcess;
  env?: NodeJS.ProcessEnv;
  runOnError?: boolean;
  script: string;
  stopOnWarning?: boolean;
  verbose?: boolean;
}

export default function ({
  script,
  child,
  env,
  runOnError = false,
  stopOnWarning = false,
  verbose = false,
}: EsStartOptions): Plugin {
  return {
    name: PLUGIN_NAME,
    setup: async function (build) {
      build.onEnd(async function ({ errors, warnings }) {
        if (child) killProcess(child, verbose);
        checkShouldContinue({
          errors,
          warnings,
          runOnError,
          stopOnWarning,
          verbose,
        });
        if (verbose) logger.info(`Starting "${script}".`);
        child = start(script, env);
      });
    },
  };
}

function start(script: string, env?: NodeJS.ProcessEnv) {
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
