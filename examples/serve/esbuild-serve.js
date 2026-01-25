import { build } from 'esbuild';
import esServe from '@es-exec/esbuild-plugin-serve';

/**
 * @type import('esbuild').BuildOptions
 */
const options = {
  entryPoints: ['src/server.ts'],
  outfile: './out/es-serve.mjs',
  target: 'esnext',
  format: 'esm',
  platform: 'node',
  plugins: [esServe({ env: { PORT: 4040 } })],
  bundle: true,
  banner: {
    js: "import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);",
  },
};

build(options).catch(function (error) {
  console.error(error.stderr);
  process.exit(1);
});
