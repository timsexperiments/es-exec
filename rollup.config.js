import { resolve } from 'path';
import dts from 'rollup-plugin-dts';
import shebang from 'rollup-plugin-preserve-shebang';
import esbuild from 'rollup-plugin-esbuild';
import fs from 'fs';

export default [
  ...createConfigs({
    packageRoot: 'utils',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'plugins/shared',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'plugins/eslint',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'plugins/es-start',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'plugins/es-serve',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'packages/es-exec',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'packages/cli',
    entryFile: 'src/main.ts',
    plugins: [shebang()],
    types: false,
  }),
];

/**
 * Creates rollup configurations based off of the {@see options}
 *
 * @param options Options to use to create the options.
 * @param {string} options.packageRoot The root folder for the package.
 * @param {string} options.entryFile The entry file inside of the package root
 * to use as the bundle input.
 * @param {Object[]} options.plugins List of additional plugins to include.
 * @param {boolean} options.skipEsm If true, does not return an esm config.
 * @param {boolean} options.skipCjs If true, does not return a commonjs config.
 * @param {boolean} options.types If true, generates typedefs for the bundle.
 *
 * @returns The specified rollup configurations.
 */
function createConfigs({
  packageRoot,
  entryFile,
  plugins,
  skipEsm = false,
  skipCjs = false,
  types = false,
  clean = true,
}) {
  const input = resolve(packageRoot, entryFile);
  const outDir = resolve(packageRoot, 'dist');
  const options = {
    input,
    outDir,
    plugins,
  };
  const config = { input, plugins: [esbuild(), ...plugins], output: [] };
  if (clean) cleanDir(outDir);
  if (!skipEsm) config.output.push(esmConfig(options));
  if (!skipCjs) config.output.push(cjsConfig(options));
  if (types) return [config, typesConfig(options)];
  return [config];
}

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
function esmConfig({ outDir }) {
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
function cjsConfig({ outDir }) {
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
function typesConfig({ input, outDir, plugins }) {
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

function cleanDir(path) {
  if (fs.existsSync(path)) fs.rmSync(path, { recursive: true });
}
