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
  const contents = fs.readFileSync(resolve('./package.json'));
  return JSON.parse(contents.toString('utf-8'));
}

/**
 * Loads a modules default export.
 *
 * @param path The path of the module.
 * @param warn Whether to display warnings.
 * @returns The default export of the module.
 */
export async function loadModule<T>(
  path: string,
  warn = false,
): Promise<T | undefined> {
  const file = resolve(path);
  try {
    return (await import(`file://${file}`)).default;
  } catch (e) {
    if (warn) {
      logger.error(e);
    }
  }
  return undefined;
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

/**
 * Recursively cleans out a directory.
 *
 * @param path Path of the directory to recursively delete all of the files in.
 */
export function cleanDir(path: string) {
  if (fs.existsSync(path)) fs.rmSync(path, { recursive: true });
}

const COMMON_CONFIG_EXTENSIONS = /\.(config\.js|json|.*rc|jsonrc)$/;

/**
 * Searches for and loads a config.
 *
 * @param configType The type of config to search for
 * @param warn Whether to warn on errors.
 * @param extensionRegex List of valid extensions to search for.
 * @returns The default export of the config module.
 */
export async function readConfig<T>(
  configType: 'es-run',
  warn = false,
  extensionRegex = COMMON_CONFIG_EXTENSIONS,
): Promise<T | undefined> {
  const file = fs
    .readdirSync(resolve())
    .filter((file) => extensionRegex.test(file))
    .find((file) => file.includes(configType));
  return await loadModule<T>(file ?? '', warn);
}
