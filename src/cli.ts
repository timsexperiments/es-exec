import { Command } from 'commander';
import { BuildOptions } from 'esbuild';
import { DEFAULT_OUT_DIR } from './utils/const.js';
import { getAllFiles, getPackageJson } from './utils/file.js';
import logger from './utils/logger.js';

const CLI_NAME = 'ESBuild-Run';
const VERSION = process.env.npm_package_version ?? '?';

const program = new Command().name(CLI_NAME);

/** Resulting config created based on the CLI. */
export interface CliResult extends Omit<BuildOptions, 'watch'> {
  clean: boolean;
  config?: string;
  entryPoints: string[];
  main?: string;
  env?: NodeJS.ProcessEnv;
  esbuildConfig?: string;
  lint: boolean;
  lintFix: boolean;
  outDir: string;
  script: string;
  useExternal?: boolean;
  verbose: boolean;
  watch: boolean;
}

interface CliOptions extends Omit<CliResult, 'env'> {
  env: { [key: string]: string };
  extensions?: string[];
}

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
    .option('--extensions [value...]', 'Extensions to find in the watch path.')
    .option('--no-watch', 'Whether to just build the file.')
    .option(
      '-c --config [value]',
      'The path to the configuration file used for set up. If none is ' +
        'specified will search current working directory for a es-start ' +
        'configuration file.',
    )
    .option('--lint-fix', 'Wether to fix lint errors.', false)
    .option('--no-lint', 'Whether to lint the src files')
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
      '--bundle',
      'Whether to bundle the project (see ' +
        'https://esbuild.github.io/api/#bundle).',
      false,
    )
    .option('--verbose', 'Verbose')
    .option(
      '--define [value...]',
      'Replace global identifiers with constant expressions (see ' +
        'https://esbuild.github.io/api/#define).',
      parseObject,
      {},
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

function findAllEntryPoints(entryPoints: string[], extensions?: Set<string>) {
  const results: string[] = [];
  entryPoints.forEach(function (entryPoint) {
    results.push(...findEntryPoints(entryPoint, extensions));
  });
  return results;
}

function findEntryPoints(src: string, extensions?: Set<string>) {
  const entryPoints: string[] = [];
  try {
    entryPoints.push(...getAllFiles(src, extensions));
  } catch (error) {
    logger.warn(`No files found in '${src}'.`);
  }
  return entryPoints;
}
function parseObject(
  memberString: string,
  object: { [key: string]: string } = {},
): { [key: string]: string } {
  const [key, value] = memberString.split('=');
  object[key] = value;
  return object;
}

function toProcessEnv(object: { [key: string]: string }) {
  const processEnv: NodeJS.ProcessEnv = {};
  Object.keys(object).forEach((key) => (processEnv[key] = object[key]));
  return processEnv;
}

function findMain(options: CliOptions) {
  if (options.main) return options.main;
  const mainRegex = /^(app|index|main|server)\.[cm]?[jt]sx?$/;
  return options.entryPoints.find(function (entryPoint) {
    return mainRegex.test(entryPoint);
  });
}

export function createBuildOptions(options: CliResult): BuildOptions {
  // Cast as 'BuildOptions & any' to be able to delete required fields from the
  // CliResult that do not overlap with build options.
  const buildOptions: BuildOptions & any = {
    ...options,
  };
  // ESBuild doesn't accept extra parameters so we need to delete all of the
  // non-overlapping fields.
  delete buildOptions.clean;
  delete buildOptions.env;
  delete buildOptions.extensions;
  delete buildOptions.lint;
  delete buildOptions.lintFix;
  delete buildOptions.main;
  delete buildOptions.outDir;
  delete buildOptions.src;
  delete buildOptions.script;
  delete buildOptions.useExternal;
  delete buildOptions.watch;

  const external = buildOptions.external ?? [];
  // When use external is set, add all package.json dependencies to the external
  // list.
  if (options.useExternal) {
    const pkg = getPackageJson();
    external.push(
      ...Object.keys(pkg?.dependencies ?? {}),
      ...Object.keys(pkg?.peerDependencies ?? {}),
    );
  }
  return { ...buildOptions, external, outdir: options.outDir };
}
