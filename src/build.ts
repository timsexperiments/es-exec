import esbuild, { BuildOptions, Metafile } from 'esbuild';
import { CliResult, createBuildOptions } from './cli.js';
import esserve from './plugins/es-serve.js';
import esstart from './plugins/es-start.js';
import eslint from './plugins/eslint.js';
import { DEFAULT_OUT_DIR } from './utils/const.js';
import { loadModule } from './utils/file.js';
import logger from './utils/logger.js';

/**
 * Runs the esbuild client with the eslint and es-start plugins.
 *
 * @param esbuildConfig The esbuild config file to use for the configuration.
 * @param options Esbuild options. Does not override options in the
 * esbuildConfig.
 * @returns The metafile data.
 */
export async function build(
  options: CliResult,
  esbuildConfig?: string,
): Promise<Metafile> {
  let esbuildOptions;
  if (esbuildConfig) esbuildOptions = loadModule<BuildOptions>(esbuildConfig);
  const cliBuildOptions = createBuildOptions(options);
  const shouldStart = options.script && options.script.length;
  logger.warn('shouldStart: ' + shouldStart);
  const result = await esbuild.build({
    ...DEFAULT_BUILD_OPTIONS,
    ...esbuildOptions,
    ...cliBuildOptions,
    plugins: [
      eslint({ fix: options.lintFix }),
      shouldStart
        ? esstart({
            script: options.script,
            env: options.env,
            verbose: options.verbose,
          })
        : esserve({
            main: options.main ?? 'outfile',
            env: options.env,
            verbose: options.verbose,
          }),
    ],
    watch: options.watch,
    metafile: true,
    logLevel: 'info',
  });

  return result.metafile;
}

const DEFAULT_BUILD_OPTIONS: BuildOptions = {
  outdir: DEFAULT_OUT_DIR,
  bundle: process.env.NODE_ENV === 'production',
  metafile: true,
};
