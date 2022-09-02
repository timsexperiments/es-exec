import build from '@es-exec/api';
import buildOptions from './esbuild.config.js';

/**
 * @type import('@es-exec/api').ESExecOptions
 */
const options = { clean: false, buildOptions, useExternal: true };

build(options).catch(function (err) {
  console.error(err);
  process.exit(1);
});
