import { ChildProcess } from 'child_process';

export interface ESStartOptions {
  child?: ChildProcess;
  env?: NodeJS.ProcessEnv;
  runOnError?: boolean;
  script: string;
  stopOnWarning?: boolean;
  verbose?: boolean;
}
