import { resolve } from 'path';
import logger from './logger';

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
