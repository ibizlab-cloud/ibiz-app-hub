import { IAppMenuItem } from '../../control/menu/iapp-menu-item';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用菜单模型对象接口
 * @export
 * @interface IAppMenuModel
 */
export interface IAppMenuModel extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 菜单项集合
   *
   * @type {IAppMenuItem[]}
   * 来源  getPSAppMenuItems
   */
  appMenuItems?: IAppMenuItem[];
}
