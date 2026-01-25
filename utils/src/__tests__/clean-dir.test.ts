import * as fs from 'fs';
import { cleanDir } from '../clean-dir';

jest.mock('fs');

describe('cleanDir', () => {
  it('should remove directory if it exists', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    cleanDir('/path/to/dir');
    expect(fs.rmSync).toHaveBeenCalledWith('/path/to/dir', { recursive: true });
  });

  it('should do nothing if directory does not exist', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    cleanDir('/path/to/dir');
    expect(fs.rmSync).not.toHaveBeenCalled();
  });
});
