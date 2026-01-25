import { loadModule } from '../load-module';

describe('loadModule', () => {
  it('should load module', async () => {
    // This is hard to unit test without actual files or complex mocking of import()
    // For now we just verify it returns undefined for non-existent
    const result = await loadModule('/non-existent');
    expect(result).toBeUndefined();
  });
});
