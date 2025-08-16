import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  input: './dist/index.esm.js',
  plugins: [nodeResolve(), commonjs(), terser()],
  output: [
    {
      dir: 'dist',
      entryFileNames: 'index.system.min.js',
      format: 'system',
    },
  ],
  external: ['@ibiz-template/runtime', 'ramda'],
});
