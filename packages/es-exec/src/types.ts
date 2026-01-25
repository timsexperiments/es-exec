import { BuildOptions } from 'esbuild';

export interface ESExecOptions {
  buildOptions?: BuildOptions;
  clean: boolean;
  env?: NodeJS.ProcessEnv;
  esbuildConfig?: string;
  lint: boolean;
  lintFix: boolean;
  main?: string;
  script?: string;
  singleLint: boolean;
  useExternal: boolean;
  verbose: boolean;
  watch: boolean;
}
