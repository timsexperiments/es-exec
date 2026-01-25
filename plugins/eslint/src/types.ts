import { ESLint } from 'eslint';

export interface ESLintPluginOptions {
  single?: boolean;
  eslintOptions: ESLint.Options;
}
