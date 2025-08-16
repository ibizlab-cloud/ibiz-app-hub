/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import libLegacy from '@qx-chitanda/vite-plugin-lib-legacy';
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['cherry-markdown', 'interactjs'],
    },
  },
  server: {
    port: 5174,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "node_modules/@ibiz-template/scss-utils/style/global.scss";',
      },
    },
  },
  plugins: [
    preact(),
    libLegacy(),
    libCss(),
    dts({
      outDir: 'dist/types',
    }),
  ],
});
