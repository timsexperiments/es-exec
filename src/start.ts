import { build } from './build.js';
import { CliResult } from './cli.js';
import { cleanDir } from './utils/file.js';

export async function start(options: CliResult) {
  if (options.clean) cleanDir(options.outDir);
  await build(options);
}
