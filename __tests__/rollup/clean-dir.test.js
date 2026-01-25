import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import { cleanDir } from '../../clean-dir.js';

vi.mock('fs');

describe('cleanDir', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should remove directory if it exists', () => {
    fs.existsSync.mockReturnValue(true);
    cleanDir('/path/to/dir');
    expect(fs.rmSync).toHaveBeenCalledWith('/path/to/dir', { recursive: true });
  });

  it('should do nothing if directory does not exist', () => {
    fs.existsSync.mockReturnValue(false);
    cleanDir('/path/to/dir');
    expect(fs.rmSync).not.toHaveBeenCalled();
  });
});
