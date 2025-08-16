// eslint-disable-next-line import/no-extraneous-dependencies
import { defineDownloadPkgConfig } from '@ibiz-template/cli';
import { refAppPkgConfig } from './ibiz-ref-app-pkg.config';

export default defineDownloadPkgConfig({
  clean: true,
  registry: 'http://172.16.240.221:8081/repository/ibizsys/',
  outDir: './public/plugins',
  // 依赖包填写示例
  dependencies: [
    ...refAppPkgConfig,
  ],
});
