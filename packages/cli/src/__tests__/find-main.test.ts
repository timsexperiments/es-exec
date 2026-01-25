import { describe, it, expect } from 'vitest';
import { findMain } from '../find-main';

describe('findMain', () => {
  it('should return main from options if present', () => {
    expect(findMain({ main: 'main.js' } as any)).toBe('main.js');
  });

  it('should find matching file in entryPoints', () => {
    expect(findMain({ entryPoints: ['index.ts'] } as any)).toBe('index.ts');
  });
});
