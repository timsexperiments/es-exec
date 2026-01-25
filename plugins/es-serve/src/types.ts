export interface ESServeOptions {
  /**
   * If main is not specified, the esbuild.BuildOptions.outfile should be used
   * instead.
   */
  main?: string;
  env?: NodeJS.ProcessEnv;
  execArgv?: string[];
  runOnError?: boolean;
  stopOnWarning?: boolean;
  verbose?: boolean;
}
