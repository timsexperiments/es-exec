import * as fs from 'fs';
import { resolve } from 'path';
import { loadModule } from './load-module.js';

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
  configType: 'es-exec',
  warn = false,
  extensionRegex = COMMON_CONFIG_EXTENSIONS,
): Promise<T | undefined> {
  const file = fs
    .readdirSync(resolve())
    .filter((file) => extensionRegex.test(file))
    .find((file) => file.includes(configType));
  return await loadModule<T>(file ?? '', warn);
}
