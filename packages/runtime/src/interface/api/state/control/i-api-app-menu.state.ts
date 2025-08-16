import { IAppMenuItem } from '@ibiz/model-core';
import { IApiControlState } from './i-api-control.state';

/**
 * @description 菜单状态接口
 * @primary
 * @export
 * @interface IApiAppMenuState
 * @extends {IApiControlState}
 */
export interface IApiAppMenuState extends IApiControlState {
  /**
   * @description 菜单项状态
   * @type {{ [p: string]: { visible: boolean; permitted: boolean } }}
   * @default {}
   * @memberof IApiAppMenuState
   */
  menuItemsState: { [p: string]: { visible: boolean; permitted: boolean } };

  /**
   * @description 移动端菜单项集合
   * @type {IAppMenuItem[]}
   * @default []
   * @memberof IApiAppMenuState
   */
  mobMenuItems: IAppMenuItem[];
}
