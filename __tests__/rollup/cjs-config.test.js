import { cjsConfig } from '../../cjs-config.js';

describe('cjsConfig', () => {
  it('should return cjs configuration', () => {
    const config = cjsConfig({ outDir: 'dist' });
    expect(config).toEqual({
      format: 'cjs',
      dir: 'dist',
      sourcemap: true,
      preserveModules: true,
      exports: 'named',
      entryFileNames: '[name].cjs',
    });
  });
});
