import { IDEMobMDCtrl } from '@ibiz/model-core';
import { IListController } from './i-list.controller';
import { IMobMdCtrlState, ISearchGroupData } from '../../state';
import { IMobMDCtrlEvent } from '../../event';
import { IApiMobMDCtrlController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 移动端多数据部件控制器接口
 * @export
 * @interface IMobMDCtrlController
 * @extends {IListController<T, S, E>}
 * @template T
 * @template S
 * @template E
 */
export interface IMobMDCtrlController<
  T extends IDEMobMDCtrl = IDEMobMDCtrl,
  S extends IMobMdCtrlState = IMobMdCtrlState,
  E extends IMobMDCtrlEvent = IMobMDCtrlEvent,
> extends IListController<T, S, E>,
    IApiMobMDCtrlController<T, S> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IMobMDCtrlController
   */
  view: IViewController;

  /**
   * @description 列表加载更多数据
   * @returns {*}  {Promise<void>}
   * @memberof IMobMDCtrlController
   */
  loadMore(): Promise<void>;

  /**
   * @description  设置分组点击
   * @param {ISearchGroupData} data
   * @memberof IMobMDCtrlController
   */
  setGroupParams(data: ISearchGroupData): void;
}
