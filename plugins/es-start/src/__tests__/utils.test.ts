import { describe, it, expect, vi } from 'vitest';
import { start } from '../utils';
import { spawn } from 'child_process';

vi.mock('child_process');

describe('start', () => {
  it('should spawn child process', () => {
    (spawn as any).mockReturnValue({
      on: vi.fn().mockReturnThis(),
    });
    start('echo hello');
    expect(spawn).toHaveBeenCalled();
  });
});
