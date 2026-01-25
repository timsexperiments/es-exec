import { describe, it, expect, vi } from 'vitest';
import { getPackageJson } from '@es-exec/utils';
import { findExternals } from '../build-utils';

vi.mock('@es-exec/utils');

describe('findExternals', () => {
  it('should return dependencies and peerDependencies', () => {
    (getPackageJson as any).mockReturnValue({
      dependencies: { dep1: '1.0.0' },
      peerDependencies: { peer1: '1.0.0' },
    });
    const result = findExternals();
    expect(result).toEqual(['dep1', 'peer1']);
  });
});
