import { logger } from '@es-exec/utils';
import chalk from 'chalk';
import { Plugin } from 'esbuild';
import { ESLint } from 'eslint';
import { join, resolve } from 'path';

interface ESLintPluginOptions {
  single?: boolean;
  eslintOptions: ESLint.Options;
}

const PLUGIN_NAME = 'eslint';

const LINT_FILTER = /\.([jt]sx?|json|cjs|.*rc)?$/;

const NODE_MODULES_REGEX = /node_modules/;

/**
 * Lints the files according to the esling configuration file and outputs the
 * results to the console.
 *
 * See https://eslint.org/docs/latest/developer-guide/nodejs-api#eslint-class
 * for implementation details.
 *
 * @param lintConfig the lint config to use.
 * @param lintConfig.eslintConfig the path to the eslint configuration file. If
 * none is specified, an .eslintrc.js file in the current working directory will
 * be used.
 * @param lintConfig.watch the path files included in the program.
 */
export default function (
  options: ESLintPluginOptions = { eslintOptions: { useEslintrc: true } },
): Plugin {
  return {
    name: PLUGIN_NAME,
    async setup(build) {
      const eslint = new ESLint(options.eslintOptions);
      const lintDirs = new Set<string>();
      if (options.single) {
        logger.warn(
          'Single is enabled. Make sure that the node_modules folder is ' +
            'ignored by eslint.',
        );
      }

      build.onResolve({ filter: /.*/ }, function ({ path, resolveDir, kind }) {
        // For all paths that are an entry point or imported. We should add
        // the folder path to the list of dirs to lint.
        const isEntryOrImported =
          kind === 'entry-point' ||
          kind === 'import-statement' ||
          kind === 'require-call';
        if (isEntryOrImported) {
          // Resolve the full path of the imported file and go back to the
          // directory to get the path where the file was imported from.
          //
          // NOTE: There is probably a better way to do this.
          const lintDir = resolve(resolveDir, path, '..');
          // No need to lint node_modules because written code shouldn't go
          // there.
          if (!NODE_MODULES_REGEX.test(path)) {
            // TODO: Implement support for other extensions.
            lintDirs.add(join(lintDir, '**', '*.[jt]s'));
          }
        }
        return undefined;
      });

      build.onLoad(
        {
          filter: LINT_FILTER,
        },
        async function ({ path }) {
          if (options.single) return;
          if (NODE_MODULES_REGEX.test(path)) return;
          await lint([path]);
          return { pluginName: PLUGIN_NAME };
        },
      );

      /** Reset isDone for --watch flag */
      build.onEnd(async () => {
        if (options.single) await lint([...lintDirs]);
      });

      /**
       * Lints the files in the `paths` via eslint.
       *
       * @param paths The paths to lint.
       */
      async function lint(paths: string[]) {
        const result = await eslint.lintFiles(paths);

        if (options?.eslintOptions?.fix) {
          ESLint.outputFixes(result);
        }

        const formatter = await eslint.loadFormatter('stylish');
        const resultText = await formatter.format(result);

        if (resultText.length) {
          console.log(resultText);
        } else {
          if (paths.length === 1) console.log(chalk.underline(paths));
          logger.info('No linting errors or warnings found! :)');
          logger.info();
        }
      }
    },
  };
}
