import { describe, it, expect } from 'vitest';
import { createEsRunOptions } from '../options';

describe('createEsRunOptions', () => {
  it('should filter out cli specific options', () => {
    const cliResult = {
      outDir: 'dist',
      clean: true,
      buildOptions: { minify: true },
    } as any;
    const result = createEsRunOptions(cliResult);
    expect(result.env).toBeUndefined();
    expect((result as any).clean).toBe(true);
    expect(result.buildOptions!.outdir).toBe('dist');
  });
});
