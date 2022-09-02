# ES Serve

An esbuild plugin for running a module after it is build with esbuild. This project will find the output module to run after being built from the esbuild outputs, or it can run a specified `main` file.

# Installation

npm

```sh
npm install @es-exec/esbuild-plugin-es-serve
```

yarn

```sh
yarn add @es-exec/esbuild-plugin-es-serve
```

# Usage

```JavaScript
import serve from '@es-exec/esbuild-plugin-serve';

/** @type import('@es-exec/esbuild-plugin-serve').ESServeOptions */
const options = {
    main: 'build/index.mjs' // The module to run after the project is built. If not specified, will run the build outputs.
};

export default {
    ..., // Other esbuild config options.
    plugins: [serve(options)],
};
```
