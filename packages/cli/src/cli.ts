import { DEFAULT_OUT_DIR } from '@es-exec/utils';
import { Command } from 'commander';
import { CliOptions, CliResult } from './types';
import {
  findAllEntryPoints,
  findMain,
  parseObject,
  toProcessEnv,
} from './utils';

const CLI_NAME = 'ESBuild-Run';
const VERSION = process.env.npm_package_version ?? '?';

const program = new Command().name(CLI_NAME);

/**
 * Runs the CLI and gets the options from the user.
 *
 * Outstanding Questions:
 * Should this cli require an esbuild file or double as a way to override
 * the esbuild values as well? (Leaning towards requiring esbuild file.)
 *
 * @returns The CLI Result.
 */
export function run(): CliResult {
  program
    .argument('[entryPoints...]', 'Command to start the program.')
    .option('--extensions [value...]', 'Extensions to find in the src path.')
    .option('--no-watch', 'Whether to just build the file.')
    .option(
      '-c --config [value]',
      'The path to the configuration file used for set up. If none is ' +
        'specified will search current working directory for a es-start ' +
        'configuration file.',
    )
    .option('--lint-fix', 'Wether to fix lint errors.', false)
    .option('--no-lint', 'Whether to lint the src files.')
    .option(
      '--esbuild-config [value]',
      'The path to the esbuild config relative to the invocation path.',
    )
    .option(
      '-s --script [value]',
      'The script to run on after the module is built. If there is no script ' +
        "provided, 'main' will be served. If 'main' is not provided, " +
        "'main.js' or 'index.js' will be served.",
      '',
    )
    .option(
      '-m --main [value]',
      'The entry point to run after building. This file is relative ' +
        'your output directory.',
    )
    .option(
      '--env [value...]',
      'Environment variables to forward to the start command.',
      parseObject,
      {},
    )
    .option(
      '--verbose',
      'Logs everything that is happening. Will slow down the build ' +
        'process. Good for debugging.',
    )
    .option(
      '--out-dir [value]',
      'The output directory for the build files. Defaults to "./build"',
      DEFAULT_OUT_DIR,
    )
    .option(
      '--no-clean',
      'If set to false, the output directory will not empty before building.',
    )
    .option(
      '--useExternal',
      'If set to true, all npm dependencies will be set as external.',
    )
    .option(
      '--no-single-lint',
      'If set to false each file will be linted separately.',
    )
    .showHelpAfterError('(add --help for additional information)')
    .version(VERSION)
    .parse(process.argv);

  const options = {
    ...program.opts<CliOptions>(),
  };

  const entryPoints = findAllEntryPoints(
    program.args,
    options.extensions?.length ? new Set(options.extensions) : undefined,
  );
  options.entryPoints = entryPoints;
  const main = findMain(options);
  return { ...options, env: toProcessEnv(options.env), main };
}

export * from './options';
export * from './types';
export * from './utils';
