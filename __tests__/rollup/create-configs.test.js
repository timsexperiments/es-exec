import { createConfigs } from '../../create-configs.js';
import { cjsConfig } from '../../cjs-config.js';
import { esmConfig } from '../../esm-config.js';

jest.mock('../../cjs-config.js');
jest.mock('../../esm-config.js');
jest.mock('../../clean-dir.js'); // mock side effect

describe('createConfigs', () => {
  it('should create configs', () => {
    esmConfig.mockReturnValue('esm-config');
    cjsConfig.mockReturnValue('cjs-config');

    const configs = createConfigs({
      packageRoot: 'pkg',
      entryFile: 'index.ts',
      plugins: [],
    });

    expect(configs).toHaveLength(1);
    expect(configs[0].output).toContain('esm-config');
    expect(configs[0].output).toContain('cjs-config');
  });
});
