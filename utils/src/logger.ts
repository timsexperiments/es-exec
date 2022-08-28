import chalk, { Chalk } from 'chalk';

function writeInColor(color: Chalk) {
  return function (...args: unknown[]) {
    console.log(color(args));
  };
}

/** Logging functions for log type disction. */
export default {
  error: writeInColor(chalk.red),
  info: writeInColor(chalk.cyan),
  success: writeInColor(chalk.green),
  warn: writeInColor(chalk.yellow),
};
