import { getPackageJson } from '@es-exec/utils';

export function findExternals() {
  const external = [];
  // When use external is set, add all package.json dependencies to the external
  // list.
  const pkg = getPackageJson();
  external.push(
    ...Object.keys(pkg?.dependencies ?? {}),
    ...Object.keys(pkg?.peerDependencies ?? {}),
  );
  return external;
}
