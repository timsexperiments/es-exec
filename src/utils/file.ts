import fs from 'fs';
import { extname, join, resolve } from 'path';
import logger from './logger.js';

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

function includesExtension(path: string) {
  return extname(path) !== '';
}

/**
 * Gets the package.json object.
 *
 * @returns The package json relative to the directory of the running script.
 */
export function getPackageJson() {
  return require(resolve('./package.json'));
}

export function loadModule<T>(path: string, warn = false): T | undefined {
  const file = resolve(path);
  try {
    return require(file);
  } catch (e) {
    if (warn) {
      logger.warn(e);
    }
    return undefined;
  }
}

export function isDir(path: string) {
  return !includesExtension(path);
}

export function cleanDir(path: string) {
  if (fs.existsSync(path)) fs.rmSync(path, { recursive: true });
}

const COMMON_CONFIG_EXTENSIONS = /\.(config\.js|json|.*rc|jsonrc)$/;

export function readConfig<T>(
  configType: 'es-start',
  extensionRegex = COMMON_CONFIG_EXTENSIONS,
): T | undefined {
  const file = fs
    .readdirSync(resolve())
    .filter((file) => extensionRegex.test(file))
    .find((file) => file.includes(configType));
  return loadModule<T>(file ?? '');
}
