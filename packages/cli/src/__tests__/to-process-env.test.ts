import { describe, it, expect } from 'vitest';
import { toProcessEnv } from '../to-process-env';

describe('toProcessEnv', () => {
  it('should convert string object to ProcessEnv', () => {
    const obj = { KEY: 'VALUE' };
    const result = toProcessEnv(obj);
    expect(result).toEqual({ KEY: 'VALUE' });
  });
});
