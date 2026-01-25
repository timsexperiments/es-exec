import { build } from 'esbuild';
import esStart from '@es-exec/esbuild-plugin-start';

/**
 * @type import('esbuild').BuildOptions
 */
const options = {
  entryPoints: ['src/server.ts'],
  outfile: './out/es-start.js',
  target: 'esnext',
  format: 'esm',
  platform: 'node',
  plugins: [esStart({ script: 'npm run demo:start', env: { PORT: 4040 } })],
  bundle: true,
  banner: {
    js: "import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);",
  },
};

build(options).catch(function (error) {
  console.error(error.stderr);
  process.exit(1);
});
