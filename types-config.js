import dts from 'rollup-plugin-dts';

/**
 * Creates a configuration for rollup to create type definitions for the input
 * bundle.
 *
 * @param  @param options The options to use to create the types package.
 * @param {string} input The input file for the bundle.
 * @param {string} packageRoot The root directory of the package.
 * @param {Object[]} plugins The additional plugins.
 *
 * @returns The type definitions rollup configuration.
 */
export function typesConfig({ input, outDir, plugins }) {
  return {
    input,
    output: {
      dir: outDir,
      format: 'es',
      preserveModules: true,
      exports: 'named',
      entryFileNames: '[name].d.ts',
    },
    plugins: [dts(), ...plugins],
  };
}
