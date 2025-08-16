/* eslint-disable import/no-extraneous-dependencies */
import { build } from 'esbuild';
import * as rf from 'rimraf';

rf.rimrafSync('dist');
rf.rimrafSync('out');

build({
  tsconfig: 'tsconfig.json',
  entryPoints: ['src/index.ts'],
  format: 'esm',
  bundle: true,
  outfile: 'dist/index.esm.js',
  globalName: 'ModelHelper',
  target: ['chrome64', 'firefox78', 'safari12', 'edge79'],
  external: ['@ibiz-template/runtime'],
});
