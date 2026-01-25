import { describe, it, expect, vi, afterEach } from 'vitest';
import * as fs from 'fs';
import { cleanDir } from '../clean-dir';

vi.mock('fs');

describe('cleanDir', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should remove directory if it exists', () => {
    (fs.existsSync as any).mockReturnValue(true);
    cleanDir('/path/to/dir');
    expect(fs.rmSync).toHaveBeenCalledWith('/path/to/dir', { recursive: true });
  });

  it('should do nothing if directory does not exist', () => {
    (fs.existsSync as any).mockReturnValue(false);
    cleanDir('/path/to/dir');
    expect(fs.rmSync).not.toHaveBeenCalled();
  });
});
