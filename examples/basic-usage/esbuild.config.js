const production = process.argv.join(' ').includes('--production');

/**
 * @type import('esbuild').BuildOptions
 */
export default {
  entryPoints: ['src/server.ts'],
  bundle: true,
  minify: production,
  platform: 'node',
  format: 'esm',
  outdir: 'out/es-exec.mjs',
  banner: {
    js: "import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);",
  },
};
