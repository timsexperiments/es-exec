import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  resolve: {
    alias: {
      '@es-exec/utils': resolve(__dirname, 'utils/src/index.ts'),
      '@es-exec/api': resolve(__dirname, 'packages/api/src/index.ts'),
    },
  },
});
