import { IApiContext, IApiData, IApiParams } from '@ibiz-template/core';
import {
  IApiModalData,
  IApiOverlayContainerOptions,
  IApiPopoverOptions,
} from '../common';

/**
 * @description 打开视图工具类
 * @export
 * @interface IApiOpenViewUtil
 */
export interface IApiOpenViewUtil {
  /**
   * @description 直接路径打开视图
   * @param {string} path
   * @returns {*}  {Promise<IApiModalData>}
   * @memberof IApiOpenViewUtil
   */
  push(path: string): Promise<IApiModalData>;

  /**
   * @description 打开顶级视图(一般为路由打开)
   * @param {string} appViewId
   * @param {IApiContext} context
   * @param {IApiParams} [params]
   * @param {IApiData} [modalOptions]
   * @returns {*}  {Promise<IApiModalData>}
   * @memberof IApiOpenViewUtil
   */
  root(
    appViewId: string,
    context: IApiContext,
    params?: IApiParams,
    modalOptions?: IApiData,
  ): Promise<IApiModalData>;

  /**
   * @description 打开顶级视图(模态方式打开)
   * @param {string} appViewId
   * @param {IApiContext} context
   * @param {IApiParams} [params]
   * @returns {*}  {Promise<IApiModalData>}
   * @memberof IApiOpenViewUtil
   */
  rootByModal(
    appViewId: string,
    context: IApiContext,
    params?: IApiParams,
  ): Promise<IApiModalData>;

  /**
   * @description 打开模态视图
   * @param {string} appViewId
   * @param {IApiContext} context
   * @param {IApiParams} [params]
   * @param {IApiOverlayContainerOptions} [options]
   * @returns {*}  {Promise<IApiModalData>}
   * @memberof IApiOpenViewUtil
   */
  modal(
    appViewId: string,
    context: IApiContext,
    params?: IApiParams,
    options?: IApiOverlayContainerOptions,
  ): Promise<IApiModalData>;

  /**
   * @description 气泡模式打开
   * @param {string} appViewId
   * @param {MouseEvent} event
   * @param {IApiContext} context
   * @param {IApiParams} [params]
   * @param {(IApiPopoverOptions & IApiOverlayContainerOptions)} [options]
   * @returns {*}  {Promise<IApiModalData>}
   * @memberof IApiOpenViewUtil
   */
  popover(
    appViewId: string,
    event: MouseEvent,
    context: IApiContext,
    params?: IApiParams,
    options?: IApiPopoverOptions & IApiOverlayContainerOptions,
  ): Promise<IApiModalData>;

  /**
   * @description 抽屉模式打开
   * @param {string} appViewId
   * @param {IApiContext} context
   * @param {IApiParams} [params]
   * @param {IApiOverlayContainerOptions} [options]
   * @returns {*}  {Promise<IApiModalData>}
   * @memberof IApiOpenViewUtil
   */
  drawer(
    appViewId: string,
    context: IApiContext,
    params?: IApiParams,
    options?: IApiOverlayContainerOptions,
  ): Promise<IApiModalData>;

  /**
   * @description 自定义打开方式
   * @param {string} appViewId
   * @param {IApiContext} context
   * @param {IApiParams} [params]
   * @returns {*}  {Promise<IApiModalData>}
   * @memberof IApiOpenViewUtil
   */
  custom(
    appViewId: string,
    context: IApiContext,
    params?: IApiParams,
  ): Promise<IApiModalData>;

  /**
   * @description 独立程序打开
   * @param {string} appViewId
   * @param {IApiContext} context
   * @param {IApiParams} [params]
   * @returns {*}  {Promise<void>}
   * @memberof IApiOpenViewUtil
   */
  popupApp(
    appViewId: string,
    context: IApiContext,
    params?: IApiParams,
  ): Promise<void>;
}
