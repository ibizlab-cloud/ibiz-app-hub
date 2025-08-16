/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

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

export default defineConfig({
  test: {
    globalSetup: './test/setup.ts',
    browser: {
      name: 'chromium',
      enabled: true,
      headless: true,
      provider: 'playwright',
    },
    globals: true, // 全局启用 Vue
    coverage: {
      enabled: false, // 启用覆盖率
    },
    server: {
      deps: {
        inline: [
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
          '@ibiz/model-core',
          'cherry-markdown',
        ],
      },
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api/ibizplm__plmweb': {
        target: 'http://172.16.220.130:30510',
        changeOrigin: true,
      },
      '/api/ibizplm__plmweb/portal/mqtt/mqtt': {
        target: 'ws://172.16.220.130:30510',
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
  ],
});
