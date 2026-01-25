import { describe, it, expect } from 'vitest';
import { killProcess } from '../kill-process';

describe('killProcess', () => {
  it('should be defined', () => {
    expect(killProcess).toBeDefined();
  });
});
