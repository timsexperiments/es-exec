import { getAllFiles, logger } from '@es-exec/utils';

export function findEntryPoints(src: string, extensions?: Set<string>) {
  const entryPoints: string[] = [];
  try {
    entryPoints.push(...getAllFiles(src, extensions));
  } catch (error) {
    logger.warn(`No files found in '${src}'.`);
  }
  return entryPoints;
}
