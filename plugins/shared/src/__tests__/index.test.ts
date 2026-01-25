import { describe, it, expect } from 'vitest';
import { checkShouldContinue } from '../index';

describe('checkShouldContinue', () => {
  it('should return true if no errors or warnings', () => {
    const result = checkShouldContinue({
      errors: [],
      warnings: [],
      runOnError: false,
      stopOnWarning: false,
      verbose: false,
    });
    expect(result).toBe(true);
  });

  it('should return false on error if not runOnError', () => {
    const result = checkShouldContinue({
      errors: ['error'],
      warnings: [],
      runOnError: false,
      stopOnWarning: false,
      verbose: false,
    });
    expect(result).toBe(false);
  });
});
