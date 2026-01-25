import { CliOptions } from './types';

export function findMain(options: CliOptions) {
  if (options.main) return options.main;
  const mainRegex = /^(app|index|main|server)\.[cm]?[jt]sx?$/;
  return options.entryPoints?.find(function (entryPoint) {
    return mainRegex.test(entryPoint);
  });
}
