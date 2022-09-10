<!-- When editing options table, best to turn off wordwrap (option + z on mac, alt + z on windows and linux in vs code). -->

# ES Exec Api

An api that builds and runs a program.

# Installation

npm

```sh
npm install --save-dev @es-exec/api
```

yarn

```sh
yarn add --dev @es-exec/api
```

# Usage

```JavaScript
import esexec from '@es-exec/api';

/** @type import('es-exec/api').ESExecOptions */
const options = {
    ..., // Any es-exec option.
    buildOptions: {
        ... // Any esbuild option.
    }
};

esexec(options)
```

## Options

All fields are optional, but either `buildOptions` or `esbuildConfig` should be
set with at least one entrypoint file in order to properly build the project.

| Name            | Type                | Description                                                                                                                                   |
| --------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `buildOptions`  | `BuildOptions`      | Esbuild options to use when building the project. Will overwrite all values in the specified esbuildConfig.                                   |
| `clean`         | `boolean`           | Cleans the outdir folder.                                                                                                                     |
| `env`           | `NodeJS.ProcessEnv` | Environment variables to pass onto the child process that starts the project.                                                                 |
| `esbuildConfig` | `string`            | The esbuild configuration file to use to build the project.                                                                                   |
| `lint`          | `boolean`           | If true, lints the project files using `@es-exec/esbuild-plugin-eslint`.                                                                      |
| `lintFix`       | `boolean`           | If true, will fix lint problems found in the project.                                                                                         |
| `main`          | `string`            | The file to run in a child process using `@es-exec/esbuild-plugin-serve`. If no main is set, will serve the outfile from the esbuild options. |
| `script`        | `string`            | CLI script to run after the package is build. If set, will use `@es-exec/esbuild-plugin-start to run the script.                              |
| `singleLint`    | `boolean`           | If true, runs `@es-exec/esbuild-plugin-eslint` in single mode.                                                                                |
| `useExternal`   | `boolean`           | If true, uses dependencies and peer dependencies in node_modules as external.                                                                 |
| `verbose`       | `boolean`           | Useful for debugging.                                                                                                                         |
| `watch`         | `boolean`           | Defaults to true. If false, will not run esbuild in watch mode. If true or not set, will run esbuild in watch mode.                           |
