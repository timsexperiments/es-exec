import { esmConfig } from '../../esm-config.js';

describe('esmConfig', () => {
  it('should return esm configuration', () => {
    const config = esmConfig({ outDir: 'dist' });
    expect(config).toEqual({
      format: 'esm',
      dir: 'dist',
      sourcemap: true,
      preserveModules: true,
      exports: 'named',
      entryFileNames: '[name].mjs',
    });
  });
});
