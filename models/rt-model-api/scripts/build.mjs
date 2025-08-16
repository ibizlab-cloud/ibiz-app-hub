import { build } from 'esbuild';
import * as rf from 'rimraf';

rf.rimrafSync('dist');

build({
  tsconfig: 'tsconfig.json',
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  outfile: 'dist/ibiz-rt-model-api.umd.js',
  globalName: 'DynamicModelAPI',
  target: ['chrome64', 'firefox78', 'safari12', 'edge79'],
});
