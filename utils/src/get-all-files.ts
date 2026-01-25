import * as fs from 'fs';
import { extname, join } from 'path';

function includesExtension(path: string) {
  return extname(path) !== '';
}

function getNestedFiles(path: string, extensions?: Set<string>): string[] {
  const filesAndDirs = fs.readdirSync(path);
  const files = filesAndDirs
    .filter((file) => extname(file) !== '')
    .filter((file) => !extensions || extensions.has(extname(file)))
    .map((file) => join(path, file));
  const dirs = filesAndDirs.filter((file) => extname(file) === '');
  for (const dir of dirs) {
    if (dir) {
      files.push(...getNestedFiles(join(path, dir), extensions));
    }
  }

  return files;
}

/**
 * Gets all of the files in the given `path` that match the extensions listed in extensions.
 *
 * @param path The path to look for all the files in.
 * @param extensions The file extensions to accept. If `undefined`, accepts all files.
 * @returns
 */
export function getAllFiles(path: string, extensions?: Set<string>): string[] {
  if (includesExtension(path)) return [path];
  return getNestedFiles(path, extensions);
}
