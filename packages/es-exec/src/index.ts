import { cleanDir, logger, readConfig } from '@es-exec/utils';
import { inspect } from 'util';
import { build } from './build.js';
import { ESExecOptions } from './types';

export * from './types';

/**
 * Starts the es-run process.
 *
 * @param options The options to use when configuring the es-run process.
 */
export default async function (options: ESExecOptions) {
  // The es-run configuration file in the current directory should be used as
  // the base options. Any passed in options should override the es-run config.
  const esExecConfig = await readConfig<ESExecOptions>(
    'es-exec',
    options.verbose,
  );
  if (esExecConfig) {
    if (options.verbose) {
      logger.info(
        'Found an es-run configuration file. Any unspecified options will be ' +
          'added.',
      );
      console.log(inspect(esExecConfig));
    }
    options = {
      ...options,
      ...esExecConfig,
      env: { ...esExecConfig?.env, ...options.env },
    };
  }
  if (options.clean) {
    if (options?.buildOptions?.outdir) {
      cleanDir(options?.buildOptions?.outdir);
    } else {
      logger.warn(
        'No output directory was specified in `buildOptions. Nothing will be ' +
          'cleaned.',
      );
    }
  }
  await build(options);
}
