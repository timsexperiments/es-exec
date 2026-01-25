/**
 * Creates a commonjs bundle configuration for rollup.
 *
 * @param options The options to use to create the esm package.
 * @param {string} input The input file for the bundle.
 * @param {string} packageRoot The root directory of the package.
 * @param {Object[]} plugins The additional plugins.
 *
 * @returns The commonjs rollup configuration.
 */
export function cjsConfig({ outDir }) {
  return {
    // CJS
    format: 'cjs',
    dir: outDir,
    sourcemap: true,
    preserveModules: true,
    exports: 'named',
    entryFileNames: '[name].cjs',
  };
}
