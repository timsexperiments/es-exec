# ES Start

A plugin for running a script on esbuild end (kind of like nodemon).

# Installation

npm

```sh
npm install @es-exec/esbuild-plugin-es-start
```

yarn

```sh
yarn add @es-exec/esbuild-plugin-es-start
```

# Usage

```JavaScript
import esStart from '@es-exec/esbuild-plugin-es-start';

export default {
    ... // Other esbuild config options.
    plugins: [esstart({ script: 'sh ./run.sh' })],
};
```
