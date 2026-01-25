import { start } from '../utils';
import { spawn } from 'child_process';

jest.mock('child_process');

describe('start', () => {
  it('should spawn child process', () => {
    (spawn as jest.Mock).mockReturnValue({
      on: jest.fn().mockReturnThis(),
    });
    start('echo hello');
    expect(spawn).toHaveBeenCalled();
  });
});
