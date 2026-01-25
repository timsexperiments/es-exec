import { describe, it, expect } from 'vitest';
import { parseObject } from '../parse-object';

describe('parseObject', () => {
  it('should parse key=value string into object', () => {
    const result = parseObject('key=value');
    expect(result).toEqual({ key: 'value' });
  });

  it('should add to existing object', () => {
    const obj = { existing: 'value' };
    const result = parseObject('new=value', obj);
    expect(result).toEqual({ existing: 'value', new: 'value' });
  });
});
