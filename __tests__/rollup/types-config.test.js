import { describe, it, expect, vi } from 'vitest';
import dts from 'rollup-plugin-dts';
import { typesConfig } from '../../types-config.js';

vi.mock('rollup-plugin-dts');

describe('typesConfig', () => {
  it('should return types configuration', () => {
    dts.mockReturnValue('dts-plugin');
    const config = typesConfig({ input: 'src/index.ts', outDir: 'dist', plugins: [] });
    expect(config).toEqual({
      input: 'src/index.ts',
      output: {
        dir: 'dist',
        format: 'es',
        preserveModules: true,
        exports: 'named',
        entryFileNames: '[name].d.ts',
      },
      plugins: ['dts-plugin'],
    });
  });
});
