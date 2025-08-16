import { IApiData } from '@ibiz-template/core';

/**
 * @description 覆盖容器配置参数
 * @export
 * @interface IApiOverlayContainerOptions
 */
export interface IApiOverlayContainerOptions {
  /**
   * @description 上下文环境对象,一般为当前视图的ctx对象
   * @type {IApiData}
   * @memberof IApiOverlayContainerOptions
   */
  ctx?: IApiData;
}
