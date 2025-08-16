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
  globalName: 'IBizRuntime',
  target: ['chrome64', 'firefox78', 'safari12', 'edge79'],
  external: [
    '@ibiz-template/core',
    '@ibiz-template/model',
    'async-validator',
    'dayjs',
    'path-browserify',
    'qs',
    'qx-util',
    'ramda',
    'lodash-es',
    'echarts',
    'mqtt/dist/mqtt.min',
    'handlebars',
  ],
});
