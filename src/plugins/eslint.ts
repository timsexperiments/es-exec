import chalk from 'chalk';
import { Plugin } from 'esbuild';
import { ESLint } from 'eslint';
import logger from '../utils/logger.js';

const PLUGIN_NAME = 'eslint';

const LINT_FILTER = /\.([jt]sx?|json|cjs|.*rc)?$/;

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
export default function (options: ESLint.Options = {}): Plugin {
  return {
    name: PLUGIN_NAME,
    setup(build) {
      const eslint = new ESLint(options);
      const { entryPoints } = build.initialOptions;
      const resolve: string[] = [];

      build.onResolve(
        { filter: LINT_FILTER },
        async function ({ path, resolveDir, kind }) {
          logger.info(path, resolveDir, kind);
          resolve.push(path);
          return undefined;
        },
      );

      build.onLoad(
        {
          filter: LINT_FILTER,
        },
        async function ({ path }) {
          const result = await eslint.lintFiles(path);

          if (options.fix) {
            ESLint.outputFixes(result);
          }

          const formatter = await eslint.loadFormatter('stylish');
          const resultText = await formatter.format(result);

          if (resultText.length) {
            console.log(resultText);
          } else {
            console.log(chalk.underline(path));
            logger.info('No linting errors or warnings found! :)');
            logger.info();
          }
          return { pluginName: PLUGIN_NAME };
        },
      );
    },
  };
}
