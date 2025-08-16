import { IDEUIActionGroup } from '../../dataentity/uiaction/ideuiaction-group';

/**
 *
 * 应用实体界面行为组模型对象接口
 * @export
 * @interface IAppDEUIActionGroup
 */
export interface IAppDEUIActionGroup extends IDEUIActionGroup {
  /**
   * 应用实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 唯一标记
   * @type {string}
   * 来源  getUniqueTag
   */
  uniqueTag?: string;
}
