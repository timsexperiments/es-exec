import chalk, { ChalkInstance } from 'chalk';

function writeInColor(color: ChalkInstance) {
  return function (...args: unknown[]) {
    console.log(color(args));
  };
}

export default {
  error: writeInColor(chalk.red),
  info: writeInColor(chalk.cyan),
  success: writeInColor(chalk.green),
  warn: writeInColor(chalk.yellow),
};
