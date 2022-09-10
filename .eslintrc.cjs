module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      parserOptions: {
        project: 'tsconfig.base.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
  ],
  rules: {
    semi: 'error',
    'prefer-const': 'error',
  },
};
