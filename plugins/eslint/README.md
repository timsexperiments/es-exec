<!-- When editing options table, best to turn off wordwrap (option + z on mac, alt + z on windows and linux in vs code). -->

# ESLint

A plugin to lint files during file resolution or all resolved (non `node_module`
files) after the build finishes when the `single` flag is used.

# Installation

npm

```sh
npm install @es-exec/esbuild-plugin-eslint
```

yarn

```sh
yarn add @es-exec/esbuild-plugin-eslint
```

# Usage

```JavaScript
import eslint from '@es-exec/esbuild-plugin-eslint';

/** @type import('@es-exec/esbuild-plugin-eslint').ESLintPluginOptions */
const options = {
    single: true, // Run one single lint on all  files outside of node_modules.
    eslintOptions: {
        ... // Any ESLint options.
    },
};

export default {
    ..., // Other esbuild config options.
    plugins: [
        eslint(options)
    ],
};
```
