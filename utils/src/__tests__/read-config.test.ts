import { readConfig } from '../read-config';

describe('readConfig', () => {
  it('should return undefined if no config found', async () => {
    // Mocking readdirSync is needed here
    const result = await readConfig('es-exec');
    expect(result).toBeUndefined();
  });
});
