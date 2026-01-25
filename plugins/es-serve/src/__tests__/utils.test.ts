import { describe, it, expect } from 'vitest';
import { determineMain } from '../utils';

describe('determineMain', () => {
  it('should return undefined if no outfiles', () => {
    expect(determineMain([])).toBeUndefined();
  });

  it('should return single outfile', () => {
    expect(determineMain(['dist/main.js'])).toBe('dist/main.js');
  });

  it('should find matching main file', () => {
    expect(determineMain(['dist/chunk.js', 'dist/main.js'])).toBe('dist/main.js');
  });
});
