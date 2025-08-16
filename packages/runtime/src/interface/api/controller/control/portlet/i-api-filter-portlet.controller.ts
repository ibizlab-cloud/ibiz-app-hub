import { IApiFilterPortletState } from '../../../state';
import { IApiPortletController } from './i-api-portlet.controller';
/**
 * @description 门户部件控制器（过滤器）
 * @export
 * @interface IApiFilterPortletController
 * @extends {IApiPortletController}
 */
export interface IApiFilterPortletController extends IApiPortletController {
  /**
   * @description 过滤器门户部件状态
   * @type {IApiFilterPortletState}
   * @memberof IApiFilterPortletController
   */
  state: IApiFilterPortletState;

  /**
   * @description 重置过滤器
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiFilterPortletController
   */
  resetFilter(): Promise<boolean>;

  /**
   * @description 执行搜索
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiFilterPortletController
   */
  search(): Promise<boolean>;

  /**
   * @description 显示影响部件
   * @returns {*}  {Promise<void>}
   * @memberof IApiFilterPortletController
   */
  showEffectiveCtrl(): Promise<void>;
}
