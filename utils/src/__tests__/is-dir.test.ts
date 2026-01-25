import { describe, it, expect } from 'vitest';
import { isDir } from '../is-dir';

describe('isDir', () => {
  it('should return true for directory path', () => {
    expect(isDir('/path/to/dir')).toBe(true);
  });

  it('should return false for file path', () => {
    expect(isDir('/path/to/file.txt')).toBe(false);
  });
});
