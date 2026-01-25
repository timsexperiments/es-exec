import { getPackageJson } from '@es-exec/utils';
import { findExternals } from '../build-utils';

jest.mock('@es-exec/utils');

describe('findExternals', () => {
  it('should return dependencies and peerDependencies', () => {
    (getPackageJson as jest.Mock).mockReturnValue({
      dependencies: { dep1: '1.0.0' },
      peerDependencies: { peer1: '1.0.0' },
    });
    const result = findExternals();
    expect(result).toEqual(['dep1', 'peer1']);
  });
});
