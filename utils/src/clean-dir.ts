import * as fs from 'fs';

/**
 * Recursively cleans out a directory.
 *
 * @param path Path of the directory to recursively delete all of the files in.
 */
export function cleanDir(path: string) {
  if (fs.existsSync(path)) fs.rmSync(path, { recursive: true });
}
