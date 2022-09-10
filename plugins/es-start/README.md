# ES Start

A plugin for running a script on esbuild end (kind of like nodemon).

# Installation

npm

```sh
npm install --save-dev @es-exec/esbuild-plugin-start
```

yarn

```sh
yarn add --dev @es-exec/esbuild-plugin-start
```

# Usage

```JavaScript
import start from '@es-exec/esbuild-plugin-start';

/** @type import('@es-exec/esbuild-plugin-start').ESLintPluginOptions */
const options = {
    ..., // Any other es start option.
    script: 'sh ./run.sh', // Required. The script to start after the build completes.
};

export default {
    ..., // Other esbuild config options.
    plugins: [start(options)],
};
```
