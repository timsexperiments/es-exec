# @es-exec/cli

A project to build and run your programs using esbuild.

## Installation

npm

```
npm install @es-exec/cli -D
```

yarn

```
yarn add @es-exec/cli -D
```

## Usage

```
es-exec src/index.ts
```

## Options

## Options

All fields are optional, but either `buildOptions` or `esbuildConfig` should be
set with at least one entrypoint file in order to properly build the project.

| Name            | Type                | Description                                                                                                                                   |
| --------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `buildOptions`  | `BuildOptions`      | Esbuild options to use when building the project. Will overwrite all values in the specified esbuildConfig.                                   |
| `clean`         | `boolean`           | Cleans the outdir folder.                                                                                                                     |
| `config`        | `string`            | Configuration file to load the options from. Any specified flag will overwrite the options.                                                   |
| `entryPoints`   | `string[]`          | The list of entrypoints to use for esbuild. If a directory is specified, all included files will be used as entrypoints.                      |
| `env`           | `NodeJS.ProcessEnv` | Environment variables to pass onto the child process that starts the project.                                                                 |
| `esbuildConfig` | `string`            | The esbuild configuration file to use to build the project.                                                                                   |
| `lint`          | `boolean`           | If true, lints the project files using `@es-exec/esbuild-plugin-eslint`. Defaults to true.                                                     |
| `lintFix`       | `boolean`           | If true, will fix lint problems found in the project.                                                                                         |
| `main`          | `string`            | The file to run in a child process using `@es-exec/esbuild-plugin-serve`. If no main is set, will serve the outfile from the esbuild options. |
| `outDir`        | `string`            | The output directory for the built project.                                                                                                   |
| `singleLint`    | `boolean`           | If true, runs `@es-exec/esbuild-plugin-eslint` in single mode.                                                                                |
| `script`        | `string`            | CLI script to run after the package is build. If set, will use `@es-exec/esbuild-plugin-start to run the script.                              |
| `useExternal`   | `boolean`           | If true, uses dependencies and peer dependencies in node_modules as external.                                                                 |
| `verbose`       | `boolean`           | Useful for debugging.                                                                                                                         |
| `watch`         | `boolean`           | Defaults to true. If false, will not run esbuild in watch mode. If true or not set, will run esbuild in watch mode.                           |
