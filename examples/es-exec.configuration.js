/**
 * @type import('@es-exec/api').ESExecOptions
 */
export default {
  lint: false,
  env: {
    port: 4041,
  },
  clean: false,
  outDir: 'out',
  singleLint: false,
  verbose: true,
  buildOptions: {
    entryPoints: ['src/server.ts'],
  },
};
