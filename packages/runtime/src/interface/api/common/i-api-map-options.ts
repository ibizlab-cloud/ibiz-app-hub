/**
 * @description 地图默认参数
 * @export
 * @interface IAPiMapOptions
 */
export interface IAPiMapOptions {
  /**
   * @description 默认区域编码
   * @type {string}
   * @memberof IAPiMapOptions
   */
  defaultArea?: string;

  /**
   * @description 是否字符串格式编码
   * @type {false}
   * @memberof IAPiMapOptions
   */
  strAreaCode: false;

  /**
   * @description 热力图配置
   * @type {IData}
   * @memberof IAPiMapOptions
   */
  visualMap: IData;

  /**
   * @description 区块颜色
   * @type {string}
   * @memberof IAPiMapOptions
   */
  areaColor: string;
  /**
   * @description 区块边界颜色
   * @type {string}
   * @memberof IAPiMapOptions
   */
  areaBorderColor: string;

  /**
   * @description 悬浮时区块颜色
   * @type {string}
   * @memberof IAPiMapOptions
   */
  hoverAreaColor: string;

  /**
   * @description 点图标
   * @type {string}
   * @memberof IAPiMapOptions
   */
  pointSymbol: string;

  /**
   * @description 地图json数据基础路径
   * @type {string}
   * @memberof IAPiMapOptions
   */
  jsonBaseUrl: string;

  /**
   * @description 默认打开的区域编码
   * @type {(string | number)}
   * @memberof IAPiMapOptions
   */
  defaultAreaCode: string | number;
}
