import { Chalk } from 'chalk';

export function writeInColor(color: Chalk) {
  return function (...args: unknown[]) {
    console.log(color(args));
  };
}
