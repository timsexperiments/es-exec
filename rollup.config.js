import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import shebang from 'rollup-plugin-preserve-shebang';

export default [
  {
    banner: '#!/usr/bin/env node',
    input: `src/main.ts`,
    plugins: [esbuild(), shebang()],
    output: [
      {
        file: `dist/main.js`,
        format: 'es',
        sourcemap: true,
      },
    ],
  },
  {
    input: `src/es-exec.ts`,
    plugins: [esbuild()],
    output: [
      {
        file: `dist/index.js`,
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    input: `src/es-exec.ts`,
    plugins: [dts()],
    output: {
      file: `dist/index.d.ts`,
      format: 'es',
    },
  },
  {
    input: `src/plugins/es-start.ts`,
    plugins: [esbuild()],
    output: {
      file: 'dist/plugins/es-start/index.js',
      format: 'cjs',
      sourcemap: true,
    },
  },
  {
    input: `src/plugins/es-start.ts`,
    plugins: [dts()],
    output: {
      file: `dist/plugins/es-start/index.d.ts`,
      format: 'es',
    },
  },
  {
    input: `src/plugins/es-serve.ts`,
    plugins: [esbuild()],
    output: {
      file: 'dist/plugins/es-serve/index.js',
      format: 'cjs',
      sourcemap: true,
    },
  },
  {
    input: `src/plugins/es-serve.ts`,
    plugins: [dts()],
    output: {
      file: `dist/plugins/es-serve/index.d.ts`,
      format: 'es',
    },
  },
  {
    input: `src/plugins/eslint.ts`,
    plugins: [esbuild()],
    output: {
      file: 'dist/plugins/eslint/index.js',
      format: 'cjs',
      sourcemap: true,
    },
  },
  {
    input: `src/plugins/eslint.ts`,
    plugins: [dts()],
    output: {
      file: `dist/plugins/eslint/index.d.ts`,
      format: 'es',
    },
  },
];
