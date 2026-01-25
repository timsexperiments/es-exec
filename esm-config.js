/**
 *  Creates an esm configuration for rollup.
 *
 * @param options The options to use to create the esm package.
 * @param {string} input The input file for the bundle.
 * @param {string} packageRoot The root directory of the package.
 * @param {Object[]} plugins The additional plugins.
 *
 * @returns The esm rollup configuration.
 */
export function esmConfig({ outDir }) {
  return {
    // ESM
    format: 'esm',
    dir: outDir,
    sourcemap: true,
    preserveModules: true,
    exports: 'named',
    entryFileNames: '[name].mjs',
  };
}
