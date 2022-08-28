import { cleanDir, logger, readConfig } from '@es-exec/utils';
import { BuildOptions } from 'esbuild';
import { inspect } from 'util';
import { build } from './build.js';

export interface ESExecOptions {
  buildOptions: BuildOptions;
  clean: boolean;
  env?: NodeJS.ProcessEnv;
  esbuildConfig?: string;
  lintFix: boolean;
  main?: string;
  outDir: string;
  singleLint: boolean;
  script?: string;
  verbose: boolean;
  watch: boolean;
}

/**
 * Starts the es-run process.
 *
 * @param options The options to use when configuring the es-run process.
 */
export default async function (options: ESExecOptions) {
  // The es-run configuration file in the current directory should be used as
  // the base options. Any passed in options should override the es-run config.
  const esRunConfig = await readConfig<ESExecOptions>(
    'es-exec',
    options.verbose,
  );
  if (esRunConfig) {
    if (options.verbose) {
      logger.info(
        'Found an es-run configuration file. Any unspecified options will be ' +
          'added.',
      );
      console.log(inspect(esRunConfig));
    }
    options = {
      ...esRunConfig,
      ...options,
      env: { ...esRunConfig?.env, ...options.env },
    };
  }
  if (options.clean) cleanDir(options.outDir);
  await build(options);
}
