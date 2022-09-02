import eslint from '@es-exec/esbuild-plugin-eslint';
import esserve from '@es-exec/esbuild-plugin-serve';
import esstart from '@es-exec/esbuild-plugin-start';
import {
  DEFAULT_OUT_DIR,
  getPackageJson,
  loadModule,
  logger,
} from '@es-exec/utils';
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
  const plugins = [];
  if (options.lint) {
    plugins.push(
      eslint({
        eslintOptions: {
          fix: options.lintFix,
          useEslintrc: true,
        },
        single: options.singleLint,
      }),
    );
  }
  const shouldStart = options.script && options.script.length;
  if (shouldStart) {
    plugins.push(
      esstart({
        script: options.script ?? '',
        env: options.env,
        verbose: options.verbose,
      }),
    );
  } else {
    plugins.push(
      esserve({
        main: options.main,
        env: options.env,
        verbose: options.verbose,
      }),
    );
  }
  const external = [];
  external.push(esbuildOptions?.external);
  external.push(options?.buildOptions?.external);
  if (options.useExternal) {
    external.push(findExternals);
  }
  const result = await esbuild.build({
    ...DEFAULT_BUILD_OPTIONS,
    ...esbuildOptions,
    ...options.buildOptions,
    plugins: [
      ...(esbuildOptions?.plugins ?? []),
      ...(options?.buildOptions?.plugins ?? []),
      ...plugins,
    ],
    watch: options.watch ?? true, // Watches by default unless specified not to.
    metafile: true,
    logLevel: 'info',
  });

  return result.metafile;
}

function findExternals() {
  const external = [];
  // When use external is set, add all package.json dependencies to the external
  // list.
  const pkg = getPackageJson();
  external.push(
    ...Object.keys(pkg?.dependencies ?? {}),
    ...Object.keys(pkg?.peerDependencies ?? {}),
  );
  return external;
}

const DEFAULT_BUILD_OPTIONS: esbuild.BuildOptions = {
  outdir: DEFAULT_OUT_DIR,
  bundle: process.env.NODE_ENV === 'production',
  metafile: true,
};
