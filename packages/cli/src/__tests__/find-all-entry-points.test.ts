import { describe, it, expect, vi } from 'vitest';
import { findAllEntryPoints } from '../find-all-entry-points';
import * as findEntryPointsModule from '../find-entry-points';

vi.mock('../find-entry-points');

describe('findAllEntryPoints', () => {
  it('should call findEntryPoints for each entry point', () => {
    (findEntryPointsModule.findEntryPoints as any).mockReturnValue(['file1']);
    const results = findAllEntryPoints(['entry1', 'entry2']);
    expect(results).toEqual(['file1', 'file1']);
    expect(findEntryPointsModule.findEntryPoints).toHaveBeenCalledTimes(2);
  });
});
