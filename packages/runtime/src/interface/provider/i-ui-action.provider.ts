import { IAppDEUIAction } from '@ibiz/model-core';
import { IUIActionResult, IUILogicParams } from '../common';

/**
 * 界面行为适配器的接口
 *
 * @author lxm
 * @date 2022-10-25 13:10:45
 * @export
 * @interface IUIActionProvider
 */
export interface IUIActionProvider {
  /**
   * 执行界面行为
   * @author lxm
   * @date 2023-05-08 09:55:06
   * @param {IAppDEUIAction} action
   * @param {IUILogicParams} params
   * @return {*}  {Promise<IUIActionResult>}
   */
  exec(
    action: IAppDEUIAction,
    params: IUILogicParams,
  ): Promise<IUIActionResult>;
}
