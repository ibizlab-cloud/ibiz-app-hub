/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  test: {
    setupFiles: ['./test/setup.ts'],
    browser: {
      name: 'chromium',
      enabled: true,
      headless: true,
      provider: 'playwright',
    },
    globals: true, // 全局启用 Vue
    coverage: {
      enabled: false, // 启用覆盖率,
      provider: 'istanbul',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/**/interface/**'],
    },
    server: {
      deps: {
        inline: [
          'vue',
          'vue-router',
          'vue-i18n',
          'async-validator',
          'dayjs',
          'dayjs/plugin/minMax',
          'dayjs/plugin/isSameOrBefore',
          'dayjs/plugin/quarterOfYear',
          'dayjs/plugin/weekOfYear',
          'dayjs/plugin/isoWeek',
          'echarts',
          'axios',
          'qs',
          'ramda',
          'interactjs',
          'lodash-es',
          'qx-util',
          'vuedraggable',
          'pinia',
          'cherry-markdown',
          '@floating-ui/dom',
          '@ibiz-template/core',
          '@ibiz-template/runtime',
          '@ibiz-template/vue3-util',
          '@ibiz-template/model-helper',
          '@ibiz-template/vue3-components',
          '@wangeditor/editor',
          '@wangeditor/editor-for-vue',
          '@imengyu/vue3-context-menu',
          '@ibiz-template-plugin/ai-chat',
        ],
      },
    },
  },
});
