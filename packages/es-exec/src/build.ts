import esserve from '@es-exec/esbuild-plugin-es-serve';
import esstart from '@es-exec/esbuild-plugin-es-start';
import eslint from '@es-exec/esbuild-plugin-eslint';
import { DEFAULT_OUT_DIR, loadModule, logger } from '@es-exec/utils';
import esbuild, { Metafile } from 'esbuild';
import { resolve } from 'path';
import { inspect } from 'util';
import { ESExecOptions } from './index.js';

/**
 * Runs the esbuild client with the eslint and es-start plugins.
 *
 * @param options es-run options. The esbuild build options override options in
 * the esbuildConfig.
 * @returns The metafile data.
 */
export async function build(options: ESExecOptions): Promise<Metafile> {
  let esbuildOptions;
  if (options.esbuildConfig) {
    esbuildOptions = await loadModule<esbuild.BuildOptions>(
      options.esbuildConfig,
      options.verbose,
    );
    if (options.verbose) {
      if (esbuildOptions) {
        logger.info(
          `Found esbuild config found at "${resolve(options.esbuildConfig)}"`,
          inspect(esbuildOptions),
        );
      } else {
        logger.warn(
          `No esbuild config found at ${resolve(options.esbuildConfig)}. ` +
            'Check your esbuild config path',
        );
      }
    }
  }
  const shouldStart = options.script && options.script.length;
  const result = await esbuild.build({
    ...DEFAULT_BUILD_OPTIONS,
    ...esbuildOptions,
    ...options.buildOptions,
    plugins: [
      eslint({
        eslintOptions: {
          fix: options.lintFix,
          useEslintrc: true,
        },
        single: options.singleLint,
      }),
      shouldStart
        ? esstart({
            script: options.script ?? '',
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

const DEFAULT_BUILD_OPTIONS: esbuild.BuildOptions = {
  outdir: DEFAULT_OUT_DIR,
  bundle: process.env.NODE_ENV === 'production',
  metafile: true,
};
