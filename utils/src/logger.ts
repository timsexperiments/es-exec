import chalk from 'chalk';
import { writeInColor } from './write-in-color.js';

/** Logging functions for log type disction. */
export default {
  error: writeInColor(chalk.red),
  info: writeInColor(chalk.cyan),
  success: writeInColor(chalk.green),
  warn: writeInColor(chalk.yellow),
};
