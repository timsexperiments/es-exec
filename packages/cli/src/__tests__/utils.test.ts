import { describe, it, expect } from 'vitest';
import { findMain } from '../utils';

describe('findMain', () => {
  it('should return main if provided in options', () => {
    const options = { main: 'custom.js', entryPoints: ['index.js'] } as any;
    expect(findMain(options)).toBe('custom.js');
  });

  it('should find matching entry point', () => {
    const options = { entryPoints: ['index.ts', 'other.ts'] } as any;
    expect(findMain(options)).toBe('index.ts');
  });
});
