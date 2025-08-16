import { IDEToolbar, IDEToolbarItem } from '@ibiz/model-core';
import { IApiData } from '@ibiz-template/core';
import { IApiControlController } from './i-api-control.controller';
import { IApiExtraButton, IApiToolbarState } from '../../state';

/**
 * 工具栏
 * @description 工具栏集中了页面常用操作按钮，点击按钮即可执行相应操作，实现页面多样化业务功能。
 * @primary
 * @export
 * @interface IApiToolbarController
 * @extends {IApiControlController<T, S>}
 * @template T
 * @template S
 */
export interface IApiToolbarController<
  T extends IDEToolbar = IDEToolbar,
  S extends IApiToolbarState = IApiToolbarState,
> extends IApiControlController<T, S> {
  /**
   * @description 所有工具栏项
   * @type {IDEToolbarItem[]}
   * @memberof IApiToolbarController
   */
  allToolbarItems: IDEToolbarItem[];

  /**
   * @description 设置额外的按钮（可多次调用，会累加）
   * @param {('before' | 'after' | number)} position
   * @param {IExtraButton[]} buttons
   * @memberof IApiToolbarController
   */
  setExtraButtons(
    position: 'before' | 'after' | number,
    buttons: IApiExtraButton[],
  ): void;

  /**
   * @description 清除所有设置的额外按钮
   * @param {('before' | 'after' | number)} [position]
   * @memberof IApiToolbarController
   */
  clearExtraButtons(position?: 'before' | 'after' | number): void;

  /**
   * @description 执行工具栏按钮点击
   * @param {(IDEToolbarItem | IApiExtraButton)} item 工具栏项
   * @param {MouseEvent} event 事件对象
   * @param {IApiData} [params] 界面行为参数（界面行为点击自定义按钮可能需要传参数到行为去，标准行为忽略此参数）
   * @returns {*}  {Promise<void>}
   * @memberof IApiToolbarController
   */
  onItemClick(
    item: IDEToolbarItem | IApiExtraButton,
    event: MouseEvent,
    params?: IApiData,
  ): Promise<void>;
}
