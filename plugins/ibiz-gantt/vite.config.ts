import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import libLegacy from '@qx-chitanda/vite-plugin-lib-legacy';
import libCss from 'vite-plugin-libcss';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
    lib: {
      entry: './src/index.ts',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'dayjs', 'lodash-es'],
    },
  },
  plugins: [vue(), libLegacy(), libCss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      styles: path.resolve(__dirname, 'src/styles'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
});
