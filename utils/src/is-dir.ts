import { extname } from 'path';

function includesExtension(path: string) {
  return extname(path) !== '';
}

/**
 * Checks whether a `path` is a directory.
 *
 * @param path The path to check.
 * @returns true if the path is a directory.
 */
export function isDir(path: string) {
  return !includesExtension(path);
}
