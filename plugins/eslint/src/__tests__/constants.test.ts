import { describe, it, expect } from 'vitest';
import { LINT_FILTER, NODE_MODULES_REGEX } from '../constants';

describe('constants', () => {
  it('LINT_FILTER should match js/ts files', () => {
    expect(LINT_FILTER.test('file.ts')).toBe(true);
    expect(LINT_FILTER.test('file.js')).toBe(true);
    expect(LINT_FILTER.test('file.tsx')).toBe(true);
  });

  it('NODE_MODULES_REGEX should match node_modules', () => {
    expect(NODE_MODULES_REGEX.test('/path/to/node_modules/pkg')).toBe(true);
  });
});
