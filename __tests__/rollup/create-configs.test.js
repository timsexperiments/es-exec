import { describe, it, expect, vi } from 'vitest';
import { createConfigs } from '../../create-configs.js';
import { cjsConfig } from '../../cjs-config.js';
import { esmConfig } from '../../esm-config.js';

describe('createConfigs', () => {
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
