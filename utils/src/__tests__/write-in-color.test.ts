import { describe, it, expect } from 'vitest';
import { writeInColor } from '../write-in-color';
import chalk from 'chalk';

describe('writeInColor', () => {
  it('should return a function', () => {
    const log = writeInColor(chalk.blue);
    expect(typeof log).toBe('function');
  });
});
