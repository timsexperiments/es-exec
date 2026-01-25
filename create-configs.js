import { resolve } from 'path';
import esbuild from 'rollup-plugin-esbuild';
import { cjsConfig } from './cjs-config.js';
import { cleanDir } from './clean-dir.js';
import { esmConfig } from './esm-config.js';
import { typesConfig } from './types-config.js';

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
export function createConfigs({
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
