import * as fs from 'fs';
import { getAllFiles } from '../get-all-files';

jest.mock('fs');

describe('getAllFiles', () => {
  it('should return file path if path is a file', () => {
    expect(getAllFiles('file.txt')).toEqual(['file.txt']);
  });
});
