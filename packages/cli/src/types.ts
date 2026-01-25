import { BuildOptions } from 'esbuild';

/** Resulting config created based on the CLI. */
export interface CliResult extends Omit<BuildOptions, 'watch'> {
  clean: boolean;
  config?: string;
  entryPoints?: string[];
  env?: NodeJS.ProcessEnv;
  esbuildConfig?: string;
  lint: boolean;
  lintFix: boolean;
  main?: string;
  outDir: string;
  script: string;
  singleLint: boolean;
  useExternal?: boolean;
  verbose: boolean;
  watch: boolean;
}

export interface CliOptions extends Omit<CliResult, 'env'> {
  env: { [key: string]: string };
  extensions?: string[];
}
