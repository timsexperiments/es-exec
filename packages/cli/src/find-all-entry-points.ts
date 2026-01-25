import { findEntryPoints } from './find-entry-points';

export function findAllEntryPoints(entryPoints: string[], extensions?: Set<string>) {
  const results: string[] = [];
  entryPoints.forEach(function (entryPoint) {
    results.push(...findEntryPoints(entryPoint, extensions));
  });
  return results;
}
