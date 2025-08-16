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
          'axios',
          'lodash-es',
          'qs',
          'qx-util',
          'ramda',
          'loglevel',
          'loglevel-plugin-prefix',
        ],
      },
    },
  },
});
