import shebang from 'rollup-plugin-preserve-shebang';
import { createConfigs } from './rollup.utils';

export default [
  ...createConfigs({
    packageRoot: 'utils',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'plugins/shared',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'plugins/eslint',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'plugins/es-start',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'plugins/es-serve',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'packages/es-exec',
    entryFile: 'src/index.ts',
    plugins: [],
    types: true,
  }),
  ...createConfigs({
    packageRoot: 'packages/cli',
    entryFile: 'src/main.ts',
    plugins: [shebang()],
    types: false,
  }),
];
