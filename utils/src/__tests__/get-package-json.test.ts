import { describe, it, expect, vi } from 'vitest';
import * as fs from 'fs';
import { getPackageJson } from '../get-package-json';

vi.mock('fs');

describe('getPackageJson', () => {
  it('should return parsed package.json', () => {
    (fs.readFileSync as any).mockReturnValue('{"name": "test"}');
    const result = getPackageJson();
    expect(result).toEqual({ name: 'test' });
  });
});
