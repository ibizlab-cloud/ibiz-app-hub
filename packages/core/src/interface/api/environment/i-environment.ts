import { LogLevelDesc } from 'loglevel';
import { IDevToolConfig } from './i-devtool-config';
import { LoginMode } from '../constant/login-mode/login-mode';
import { MenuPermissionMode } from '../constant/menu-permission-mode/menu-permission-mode';
import { IApiParams } from '../global-param/i-global-param';

/**
 * 环境变量
 * @description 定义应用系统的全局环境变量，用于配置应用运行时的各项参数和行为，支持灵活定制以适配不同运行环境。
 * @export
 * @interface IEnvironment
 */
export interface IEnvironment {
  /**
   * @description 样式bem的命名空间
   * @default ibiz
   * @type {string}
   * @memberof IEnvironment
   */
  namespace?: string;

  /**
   * @description 是否为开发模式
   * @type {boolean}
   * @default false
   * @memberof IEnvironment
   */
  dev: boolean;

  /**
   * @description 是否为多应用 hub 基座模式
   * @type {boolean}
   * @default true
   * @memberof IEnvironment
   */
  hub: boolean;

  /**
   * @description 是否启用 mqtt (ws模式消息)
   * @type {boolean}
   * @default false
   * @memberof IEnvironment
   */
  enableMqtt: boolean;

  /**
   * @description mqtt 默认连接地址,emq 服务地址 /portal/mqtt/mqtt, rebbitmq 服务地址 /portal/mqtt/ws
   * @type {string}
   * @default /portal/mqtt/mqtt
   * @memberof IEnvironment
   */
  mqttUrl: string;

  /**
   * @description 默认应用的应用标识
   * @type {string}
   * @memberof IEnvironment
   */
  appId: string;

  /**
   * @description 日志级别,使用`loglevel`插件包生成
   * @type {LogLevelDesc}
   * @default ERROR
   * @memberof IEnvironment
   */
  logLevel: LogLevelDesc;

  /**
   * @description 请求根路径
   * @type {string}
   * @default /api
   * @memberof IEnvironment
   */
  baseUrl: string;

  /**
   * @description 插件默认所在目录，获取插件时根据该值拼接出完整的url
   * @type {string}
   * @default http://172.16.240.221
   * @memberof IEnvironment
   */
  pluginBaseUrl: string;

  /**
   * @description 登录模式;DEFAULT: 默认标准登录,CUSTOM: 自定义登录,CAS: 中央认证登录,OAUTH: oauth登录
   * @type {LoginMode}
   * @default DEFAULT
   * @memberof IEnvironment
   */
  loginMode: LoginMode;

  /**
   * @description oauth 开放接入标识
   * @type {string}
   * @memberof IEnvironment
   */
  oauthOpenAccessId: string;

  /**
   * @description 中央认证登录地址
   * @type {string}
   * @memberof IEnvironment
   */
  casLoginUrl: string;

  /**
   * @description 模型是否为本地模型(走静态资源模式)（已弃用）
   * @type {boolean}
   * @default false
   * @memberof IEnvironment
   */
  isLocalModel: boolean;

  /**
   * @description 远程模型路径
   * @type {string}
   * @default /remotemodel
   * @memberof IEnvironment
   */
  remoteModelUrl: string;

  /**
   * @description 资源文件根路径
   * @type {string}
   * @default ./assets
   * @memberof IEnvironment
   */
  assetsUrl: string;

  /**
   * @description 中心系统标识
   * @type {string}
   * @memberof IEnvironment
   */
  dcSystem: string;

  /**
   * @description 文件下载url
   * @type {string}
   * @default /ibizutil/download/{cat}
   * @memberof IEnvironment
   */
  downloadFileUrl: string;

  /**
   * @description 文件上传url
   * @type {string}
   * @default /ibizutil/upload/{cat}
   * @memberof IEnvironment
   */
  uploadFileUrl: string;

  /**
   * @description 是否启用权限校验（默认true）
   * @type {boolean}
   * @default true
   * @memberof IEnvironment
   */
  enablePermission: boolean;

  /**
   * @description 菜单权限校验模式（默认MIXIN）
   * @type {MenuPermissionMode}
   * @default MIXIN
   * @memberof IEnvironment
   */
  menuPermissionMode: MenuPermissionMode;

  /**
   * @description 路由占位符
   * @type {string}
   * @default '-'
   * @memberof IEnvironment
   */
  routePlaceholder: string;

  /**
   * @description 是否让所有工作流history接口走all（已弃用）
   * @type {boolean}
   * @default false
   * @memberof IEnvironment
   */
  enableWfAllHistory: boolean;

  /**
   * @description 是否启用加密,加密模式为RSA加密
   * @type {boolean}
   * @default false
   * @memberof IEnvironment
   */
  enableEncryption: boolean;

  /**
   * @description 应用loadding主题
   * @type {('DEFAULT' | 'DARK' | 'LIGHT')}
   * @default DEFAULT
   * @memberof IEnvironment
   */
  appLoadingTheme: 'DEFAULT' | 'DARK' | 'LIGHT';

  /**
   * @description 应用标题
   * @type {string}
   * @memberof IEnvironment
   */
  AppTitle?: string;

  /**
   * @description 应用标记
   * @type {string}
   * @memberof IEnvironment
   */
  AppLabel?: string;

  /**
   * @description 是否为 SaaS 模式
   * @type {boolean}
   * @default true
   * @memberof IEnvironment
   */
  isSaaSMode?: boolean;

  /**
   * @description 是否为移动端应用
   * @type {boolean}
   * @default false
   * @memberof IEnvironment
   */
  isMob?: boolean;

  /**
   * @description 应用图标地址
   * @type {string}
   * @default ./favicon.ico
   * @memberof IEnvironment
   */
  favicon?: string;

  /**
   * @description 是否启用多语言,此值是默认加载后，根据应用模型中的配置来决定是否启用多语言。请勿手动修改此值
   * @type {boolean}
   * @default false
   * @memberof IEnvironment
   */
  isEnableMultiLan?: boolean;

  /**
   * @description 匿名用户名
   * @type {string}
   * @memberof IEnvironment
   */
  anonymousUser?: string;

  /**
   * @description 匿名用户密码
   * @type {string}
   * @memberof IEnvironment
   */
  anonymousPwd?: string;

  /**
   * @description 启用匿名模式
   * @type {boolean}
   * @default false
   * @memberof IEnvironment
   */
  enableAnonymous?: boolean;

  /**
   * @description 访问数据存储区域
   * @type {('COOKIE' | 'LOCALSTORAGE' | 'SESSIONSTORAGE')}
   * @default COOKIE
   * @memberof IEnvironment
   */
  accessStoreArea: 'COOKIE' | 'LOCALSTORAGE' | 'SESSIONSTORAGE';

  /**
   * @description 市场地址，与实体子应用引用视图配合使用
   * @type {string}
   * @memberof IEnvironment
   */
  marketAddress?: string;

  /**
   * @description devtool的配置对象
   * @type {IDevToolConfig}
   * @memberof IEnvironment
   */
  devtoolConfig?: IDevToolConfig;

  /**
   * @description 是否启用title，是否hover时线上title提示
   * @type {boolean}
   * @default true
   * @memberof IEnvironment
   */
  enableTitle?: boolean;

  /**
   * @description token头
   * @type {string}
   * @memberof IEnvironment
   */
  tokenHeader?: string;

  /**
   * @description token前缀
   * @type {string}
   * @memberof IEnvironment
   */
  tokenPrefix?: string;

  /**
   * @description 自定义动态参数，格式如：{\"XXX\":\"YYY\",\"AAA\":\"BBB\"}
   * @type {IApiParams}
   * @memberof IEnvironment
   */
  customParams?: IApiParams;

  /**
   * @description 定义cookie作用域
   * @type {string}
   * @memberof IEnvironment
   */
  cookieDomain?: string;

  /**
   * @description 环境类型
   * @type {('development' | 'test' | 'production')}
   * @default development
   * @memberof IEnvironment
   */
  environmentTag?: 'development' | 'test' | 'production';

  /**
   * @description 移动端菜单呈现模式，DEFAULT：菜单映射的页面菜单显示，非菜单映射的页面菜单不显示；ALWAYS：所有页面菜单都显示,默认：DEFAULT
   * @type {('DEFAULT' | 'ALWAYS')}
   * @default DEFAULT
   * @memberof IEnvironment
   */
  mobMenuShowMode?: 'DEFAULT' | 'ALWAYS';

  /**
   * @description 是否启用AI支持
   * @type {boolean}
   * @default true
   * @memberof IEnvironment
   */
  enableAI: boolean;

  /**
   * @description 应用版本号
   * @type {string}
   * @memberof IEnvironment
   */
  appVersion?: string;

  /**
   * @description 高德地图安全密钥
   * @type {string}
   * @memberof IEnvironment
   */
  aMapSecurityJsCode?: string;

  /**
   * @description 高德地图key
   * @type {string}
   * @memberof IEnvironment
   */
  aMapKey?: string;

  /**
   * @description 运行容器
   * @type {('DYNAENGINE' | 'FULLCODE')} 动态引擎 | 全代码
   * @memberof IEnvironment
   */
  runContainer?: 'DYNAENGINE' | 'FULLCODE';
}
