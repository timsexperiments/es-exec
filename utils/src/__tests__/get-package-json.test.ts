import * as fs from 'fs';
import { getPackageJson } from '../get-package-json';

jest.mock('fs');

describe('getPackageJson', () => {
  it('should return parsed package.json', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue('{"name": "test"}');
    const result = getPackageJson();
    expect(result).toEqual({ name: 'test' });
  });
});
