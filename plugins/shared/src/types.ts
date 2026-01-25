export interface CheckShouldContinueArgs {
  stopOnWarning: boolean;
  runOnError: boolean;
  verbose: boolean;
  errors: unknown[];
  warnings: unknown[];
}
