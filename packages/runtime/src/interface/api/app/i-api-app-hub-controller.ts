import { IApiData } from '@ibiz-template/core';
import { IApiAuthResult } from '../service';

/**
 * @description 应用中心控制器
 * @export
 * @interface IApiAppHubController
 */
export interface IApiAppHubController {
  /**
   * @description 全局共享数据对象
   * @type {IApiData}
   * @memberof IApiAppHubController
   */
  session: IApiData;

  /**
   * @description 登录（包含调用登录逻辑，及跳转应用界面）
   * @param {string} loginName
   * @param {string} password
   * @param {boolean} [remember]
   * @param {IApiData} [headers]
   * @param {IApiData} [opts]
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiAppHubController
   */
  login(
    loginName: string,
    password: string,
    remember?: boolean,
    headers?: IApiData,
    opts?: IApiData,
  ): Promise<boolean>;

  /**
   * @description 登出
   * @param {IApiData} [opts]
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiAppHubController
   */
  logout(opts?: IApiData): Promise<boolean>;

  /**
   * @description 变更密码
   * @param {string} oldPwd
   * @param {string} newPwd
   * @param {IApiData} [opts]
   * @returns {*}  {Promise<IApiAuthResult>}
   * @memberof IApiAppHubController
   */
  changePwd(
    oldPwd: string,
    newPwd: string,
    opts?: IApiData,
  ): Promise<IApiAuthResult>;

  /**
   * @description 切换组织
   * @param {string} oldOrgId
   * @param {string} newOrgId
   * @param {IApiData} [opts]
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiAppHubController
   */
  switchOrg(
    oldOrgId: string,
    newOrgId: string,
    opts?: IApiData,
  ): Promise<boolean>;

  /**
   * @description 切换主题
   * @param {string} oldTheme
   * @param {string} newTheme
   * @param {IApiData} [opts]
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiAppHubController
   */
  switchTheme(
    oldTheme: string,
    newTheme: string,
    opts?: IApiData,
  ): Promise<boolean>;

  /**
   * @description 切换语言
   * @param {string} oldLanguage
   * @param {string} newLanguage
   * @param {IApiData} [opts]
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiAppHubController
   */
  switchLanguage(
    oldLanguage: string,
    newLanguage: string,
    opts?: IApiData,
  ): Promise<boolean>;
}
