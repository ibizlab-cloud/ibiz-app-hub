import { IControl } from '@ibiz/model-core';
import { IApiData, IApiParams } from '@ibiz-template/core';
import { IApiControlState } from '../../state';
import { IApiViewController } from '../view';
import { IApiViewLayoutPanelController } from './i-api-view-layout-panel.controller';
import { IApiController } from '../common/i-api.controller';
import { IApiMaskOption } from '../common';

/**
 * @primary
 * @description 部件控制器基类
 * @export
 * @interface IApiControlController
 * @extends {IApiController<T, S>}
 * @template T
 * @template S
 */
export interface IApiControlController<
  T extends IControl = IControl,
  S extends IApiControlState = IApiControlState,
> extends IApiController<T, S> {
  /**
   * @description 当前视图控制器
   * @type {(IApiViewController & IApiData)}
   * @memberof IApiControlController
   */
  view: IApiViewController & IApiData;

  /**
   * @description 部件标识
   * @type {string}
   * @memberof IApiControlController
   */
  ctrlId: string;

  /**
   * @description 部件参数
   * @type {IApiParams}
   * @memberof IApiControlController
   */
  controlParams: IApiParams;

  /**
   * @description 部件布局面板控制器
   * @type {(IApiViewLayoutPanelController & IApiData)}
   * @memberof IApiControlController
   */
  layoutPanel?: IApiViewLayoutPanelController & IApiData;

  /**
   * @description 运行模式（DESIGN：设计模式，RUNTIME：运行时）
   * @type {('DESIGN' | 'RUNTIME')}
   * @memberof IApiControlController
   */
  runMode: 'DESIGN' | 'RUNTIME';

  /**
   * @description 开始加载
   * @returns {*}  {Promise<void>}
   * @memberof IApiControlController
   */
  startLoading(): Promise<void>;

  /**
   * @description 加载完毕
   * @returns {*}  {Promise<void>}
   * @memberof IApiControlController
   */
  endLoading(): Promise<void>;

  /**
   * @description 获取部件类型
   * @returns {*}  {string}
   * @memberof IApiControlController
   */
  getControlType(): string;

  /**
   * @description 取消部件禁用
   * @memberof IApiControlController
   */
  enable(): void;

  /**
   * @description 设置部件禁用
   * @param {IApiMaskOption} [options] 部件禁用参数，主要包含遮罩层相关参数
   * @memberof IApiControlController
   */
  disabled(options?: IApiMaskOption): void;

  /**
   * @description 触发实体数据变更的通知
   * @param {('create' | 'update' | 'remove')} type
   * @param {IApiData} data
   * @memberof IApiControlController
   */
  emitDEDataChange(type: 'create' | 'update' | 'remove', data: IApiData): void;
}
