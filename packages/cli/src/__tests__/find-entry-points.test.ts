import { describe, it, expect, vi } from 'vitest';
import { getAllFiles } from '@es-exec/utils';
import { findEntryPoints } from '../find-entry-points';

vi.mock('@es-exec/utils');

describe('findEntryPoints', () => {
  it('should return files found using getAllFiles', () => {
    (getAllFiles as any).mockReturnValue(['file1']);
    const result = findEntryPoints('src');
    expect(result).toEqual(['file1']);
  });

  it('should return empty array and log warning on error', () => {
    (getAllFiles as any).mockImplementation(() => {
      throw new Error('Not found');
    });
    const result = findEntryPoints('src');
    expect(result).toEqual([]);
  });
});
