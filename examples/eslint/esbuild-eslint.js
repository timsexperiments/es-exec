import { build } from 'esbuild';
import eslint from '@es-exec/esbuild-plugin-eslint';

const single = process.argv.join(' ').includes('--single');

/**
 * @type import('esbuild').BuildOptions
 */
const options = {
  entryPoints: ['src/server.ts'],
  outfile: './out/eslint.mjs',
  target: 'esnext',
  format: 'esm',
  platform: 'node',
  plugins: [eslint({ single })],
  bundle: true,
  banner: {
    js: "import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);",
  },
};

build(options).catch(function (error) {
  console.error(error.stderr);
  process.exit(1);
});
