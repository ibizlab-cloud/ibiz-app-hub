import { LogLevelDesc } from 'loglevel';

/**
 * @description 开发调试工具配置
 * @export
 * @interface IDevToolConfig
 */
export interface IDevToolConfig {
  /**
   * @description 配置平台基础路径
   * @type {string}
   * @default https://open.ibizlab.cn/modeldesign/#/
   * @memberof IDevToolConfig
   */
  studioBaseUrl?: string;

  /**
   * @description 模型预览宽度
   * @type {number}
   * @memberof IDevToolConfig
   */
  modelPreviewWidth?: number;

  /**
   * @description 日志级别
   * @type {LogLevelDesc}
   * @memberof IDevToolConfig
   */
  logLevel?: LogLevelDesc;

  /**
   * @description 是否启用v9模式
   * @type {boolean}
   * @default false
   * @memberof IDevToolConfig
   */
  v9Mode?: boolean;

  /**
   * @description 默认打开模式
   * @type {('open' | 'close')}
   * @default 'close'
   * @memberof IDevToolConfig
   */
  defaultMode?: 'open' | 'close';
}
