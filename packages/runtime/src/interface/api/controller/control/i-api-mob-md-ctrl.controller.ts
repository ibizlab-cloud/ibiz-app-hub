import { IDEMobMDCtrl } from '@ibiz/model-core';
import { IApiMobMdCtrlState } from '../../state';
import { IApiListController } from './i-api-list.controller';

/**
 * 移动端多数据部件
 * @description 以列表形式进行展示，每一项整合图文、操作按钮等元素，提供清晰的信息层级和视觉分隔。
 * @primary
 * @export
 * @interface IApiMobMDCtrlController
 * @extends {IApiListController<T, S>}
 * @template T
 * @template S
 */
export interface IApiMobMDCtrlController<
  T extends IDEMobMDCtrl = IDEMobMDCtrl,
  S extends IApiMobMdCtrlState = IApiMobMdCtrlState,
> extends IApiListController<T, S> {}
