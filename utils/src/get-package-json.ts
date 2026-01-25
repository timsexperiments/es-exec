import * as fs from 'fs';
import { resolve } from 'path';

/**
 * Gets the package.json object.
 *
 * @returns The package json relative to the directory of the running script.
 */
export function getPackageJson() {
  const contents = fs.readFileSync(resolve('./package.json'));
  return JSON.parse(contents.toString('utf-8'));
}
