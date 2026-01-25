import { logger } from '@es-exec/utils';
import { fork } from 'child_process';

export function determineMain(outfiles: string[]) {
  const mainFile = /(bundle|index|main|server)\.[cm]?[jt]sx?$/;
  if (!outfiles) return undefined;
  if (outfiles.length === 1) {
    return outfiles[0];
  }
  return outfiles.map((outFile) => outFile).find((file) => mainFile.test(file));
}

export function startModule(
  main: string,
  env?: NodeJS.ProcessEnv,
  execArgv?: string[],
) {
  const child = fork(main, { env, execArgv, stdio: 'inherit' })
    .on('spawn', function () {
      logger.info(`> ${main}`);
    })
    .on('error', function (error) {
      logger.error(error);
    })
    .on('close', function (code) {
      logger.info(`Completed '${main}' with exit code ${code}`);
      child.kill('SIGINT');
    });
  return child;
}
