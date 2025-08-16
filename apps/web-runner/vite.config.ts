/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
// import { visualizer } from 'rollup-plugin-visualizer'; // 打包内容分析
import IBizVitePlugin from './vite-plugins/ibiz-vite-plugin';

/**
 * 判断是否为自定义标签
 *
 * @author chitanda
 * @date 2023-01-03 16:01:00
 * @param {string} tag
 * @return {*}  {boolean}
 */
function isCustomElement(tag: string): boolean {
  return tag.startsWith('ion-');
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    entries: [
      '@floating-ui/dom',
      '@ibiz-template/core',
      '@ibiz-template/model-helper',
      '@ibiz-template/runtime',
      '@ibiz-template/them',
      '@ibiz-template/vue3-components',
      '@ibiz-template/vue3-util',
      '@ibiz-template/web-theme',
      '@ibiz/model-core',
      '@ibiz-template/devtool',
      '@imengyu/vue3-context-menu',
      '@monaco-editor/loader',
      '@wangeditor/editor',
      '@wangeditor/editor-for-vue',
      'async-validator',
      'cherry-markdown',
      'dayjs',
      'echarts',
      'element-plus',
      'file-saver',
      'lodash-es',
      'monaco-editor',
      'nprogress',
      'path-browserify',
      'vue-grid-layout',
      'pinia',
      'qs',
      'qx-util',
      'ramda',
      'vue',
      'vue-i18n',
      'vue-router',
      'vue-grid-layout',
      'vue-text-format',
      'vuedraggable',
      'xlsx',
      'interactjs',
      'mqtt/dist/mqtt.min',
      '@ibiz-template-plugin/ai-chat',
      '@ibiz-template-plugin/bi-report',
      '@ibiz-template-plugin/data-view',
      '@antv/x6',
      '@antv/x6-plugin-clipboard',
      '@antv/x6-plugin-dnd',
      '@antv/x6-plugin-export',
      '@antv/x6-plugin-history',
      '@antv/x6-plugin-keyboard',
      '@antv/x6-plugin-minimap',
      '@antv/x6-plugin-scroller',
      '@antv/x6-plugin-selection',
      '@antv/x6-plugin-snapline',
      '@antv/x6-plugin-stencil',
    ],
  },
  build: {
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'vue-i18n',
        'element-plus',
        'async-validator',
        'dayjs',
        'interactjs',
        'echarts',
        'axios',
        'qs',
        'ramda',
        'lodash-es',
        'qx-util',
        'vuedraggable',
        'pinia',
        'mqtt/dist/mqtt.min',
        '@floating-ui/dom',
        'vue-grid-layout',
        '@imengyu/vue3-context-menu',
        '@wangeditor/editor',
        '@wangeditor/editor-for-vue',
        '@ibiz-template/core',
        '@ibiz-template/runtime',
        '@ibiz-template/vue3-util',
        '@ibiz-template/model-helper',
        '@ibiz-template/vue3-components',
        '@ibiz-template-plugin/ai-chat',
        '@ibiz-template/web-theme',
        '@ibiz-template/devtool',
        '@antv/x6',
        'cherry-markdown',
        '@antv/x6',
        '@antv/x6-plugin-clipboard',
        '@antv/x6-plugin-dnd',
        '@antv/x6-plugin-export',
        '@antv/x6-plugin-history',
        '@antv/x6-plugin-keyboard',
        '@antv/x6-plugin-minimap',
        '@antv/x6-plugin-scroller',
        '@antv/x6-plugin-selection',
        '@antv/x6-plugin-snapline',
        '@antv/x6-plugin-stencil',
      ],
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api/c85a9cfc76024ede4c6200b3f82eac9d__plmweb__formdesign': {
        target: 'https://plm.ibizlab.cn',
        changeOrigin: true,
      },
      '/api/ibizplm__plmweb': {
        target: 'https://plm.ibizlab.cn',
        changeOrigin: true,
      },
      '/api/f268d51400e62c982974b66a561bbe28__plmweb__plmcomweb': {
        target: 'https://plm.ibizlab.cn',
        changeOrigin: true,
      },
      '/api/ibizplm__plmweb/portal/mqtt/mqtt': {
        target: 'wss://plm.ibizlab.cn',
        changeOrigin: true,
      },
      '/api/333a5fe850a5a9235744a63bcee17b40__plmweb__formdesign': {
        target: 'https://plm.ibizlab.cn',
        changeOrigin: true,
      },
      '/api/bee3e98b47a6ae07936311e25460a636__plmweb__logicdesign': {
        target: 'https://plm.ibizlab.cn',
        changeOrigin: true,
      },
      '/api/8d6b7a540f03688de6c2fafee39b339e__plmweb__logicdesign': {
        target: 'https://plm.ibizlab.cn',
        changeOrigin: true,
      },
      '/api/4178bef3e0e0f43479aea070a3ee4188__plmweb__plmcomweb': {
        target: 'https://plm.ibizlab.cn',
        changeOrigin: true,
      },
      '/api/ibizplm__plmwiki': {
        target: 'https://plm.ibizlab.cn',
        changeOrigin: true,
      },
    },
    cors: true,
    fs: {
      strict: false,
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
    vue({
      template: {
        compilerOptions: {
          isCustomElement,
        },
      },
    }),
    vueJsx({
      isCustomElement,
    }),
    legacy({ externalSystemJS: true }),
    IBizVitePlugin(),
    // visualizer(),
  ],
});
