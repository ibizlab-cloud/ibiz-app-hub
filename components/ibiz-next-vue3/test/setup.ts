import { runApp } from '../src';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).Environment = {
  // 是否为开发模式
  dev: true,
  // 日志输出级别, 支持: TRACE,DEBUG,INFO,WARN,ERROR,SILENT
  logLevel: 'ERROR',
  BaseUrl: '/api',
  pluginBaseUrl: 'http://172.16.240.221',
  hub: true,
  enableMqtt: true,
  mqttUrl: '/portal/mqtt/mqtt',
  enableAnonymous: false,
  anonymousUser: '',
  anonymousPwd: '',
  // 应用市场地址
  marketAddress: '',
  appId: 'sztrainsys__web',
  mockDcSystemId: 'ac2720c74d5456b40e24aeaf6ffffbd2',
  // 应用标题
  AppTitle: '应用首页',
  favicon: './favicon.ico',
};

runApp();

console.log(window.ibiz);
