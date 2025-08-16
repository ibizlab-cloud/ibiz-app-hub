/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import libLegacy from '@qx-chitanda/vite-plugin-lib-legacy';
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // sourcemap: true,
    lib: {
      entry: './src/index.ts',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        '@ibiz/model-core',
        'element-plus',
        'vuedraggable',
        'axios',
        'ramda',
        'echarts',
        '@ibiz-template/core',
        '@ibiz-template/runtime',
        '@wangeditor/editor',
        'dayjs',
      ],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@ibiz-template/theme/style/global.scss";',
      },
    },
  },
  plugins: [
    // eslint({
    //   include: 'src/**/*.{ts,tsx,js,jsx}',
    // }),
    vue(),
    vueJsx(),
    libLegacy(),
    libCss(),
    dts({
      outDir: 'dist/types',
    }),
  ],
});
