import { DEFAULT_OUT_DIR } from '@es-exec/utils';
import { BuildOptions } from 'esbuild';

export const DEFAULT_BUILD_OPTIONS: BuildOptions = {
  outdir: DEFAULT_OUT_DIR,
  bundle: process.env.NODE_ENV === 'production',
  metafile: true,
};
