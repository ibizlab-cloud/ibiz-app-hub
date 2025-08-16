import { IAppMenu, IAppMenuItem } from '@ibiz/model-core';
import { IApiControlController } from './i-api-control.controller';
import { IApiAppMenuState } from '../../state';

/**
 * 应用菜单
 * @description 菜单是网站导航的核心组件，用于组织并展示站点层级结构，提供快速访问路径。其中PC端菜单通常包含水平/垂直布局、多级下拉、高亮交互等功能，移动端菜单则是在页面底部进行平铺展示，支持高亮交互，折叠收缩多余菜单项等功能。
 * @primary
 * @export
 * @interface IApiMenuController
 * @extends {IApiControlController<T, S>}
 * @template T
 * @template S
 */
export interface IApiMenuController<
  T extends IAppMenu = IAppMenu,
  S extends IApiAppMenuState = IApiAppMenuState,
> extends IApiControlController<T, S> {
  /**
   * @description 所有菜单项
   * @type {IAppMenuItem[]}
   * @memberof IApiMenuController
   */
  allAppMenuItems: IAppMenuItem[];

  /**
   * @description 获取菜单默认打开视图
   * @returns {*}  {(string | undefined)}
   * @memberof IApiMenuController
   */
  getDefaultOpenView(): string | undefined;
}
