import { ESExecOptions } from '@es-exec/api';
import { BuildOptions } from 'esbuild';
import { CliResult } from './types';

/**
 * Creates the es-run options out of the CLI result.
 *
 * @param result The CLI result to convert into es-run options.
 * @returns The options to use to for the es-run.
 */
export function createEsRunOptions(
  result: CliResult & ESExecOptions,
): ESExecOptions {
  // Cast as 'BuildOptions & any' to be able to delete required fields from the
  // CliResult that do not overlap with build options.
  const buildOptions: BuildOptions & any = {
    ...result,
    ...result.buildOptions,
  };
  // ESBuild doesn't accept extra parameters so we need to delete all of the
  // non-overlapping fields.
  delete buildOptions.buildOptions;
  delete buildOptions.clean;
  delete buildOptions.config;
  delete buildOptions.env;
  delete buildOptions.esbuildConfig;
  delete buildOptions.extensions;
  delete buildOptions.external;
  delete buildOptions.lint;
  delete buildOptions.lintFix;
  delete buildOptions.main;
  delete buildOptions.outdir;
  delete buildOptions.outDir;
  delete buildOptions.singleLint;
  delete buildOptions.src;
  delete buildOptions.script;
  delete buildOptions.useExternal;
  delete buildOptions.watch;
  delete buildOptions.verbose;

  return {
    ...result,
    buildOptions: {
      ...buildOptions,
      outdir: result.outDir,
    },
  };
}
