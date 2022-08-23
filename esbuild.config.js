// esbuild src/main.ts src/plugins/es-start.ts src/plugins/eslint.ts --bundle --target=node16 --platform=node --outdir=dist --format=esm --resolve-extensions=.ts,.js --external:commander --external:esbuild --external:os --external:fs --external:path --external:chalk --external:eslint
export default {
  bundle: true,
  resolveExtensions: ['.ts', '.js'],
  platform: 'node',
};
