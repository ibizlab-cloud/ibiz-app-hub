/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'vue-router';
import {
  IAiChatParam,
  IApiViewController,
  IApiViewState,
  IAppUtil,
  IAuthResult,
} from '@ibiz-template/runtime';
import { IApiParams, IChatMessage, RuntimeError } from '@ibiz-template/core';
import { IAppView } from '@ibiz/model-core';

export class AppUtil implements IAppUtil {
  /**
   * Creates an instance of AppUtil.
   * @author tony001
   * @date 2024-05-14 17:05:00
   * @param {Router} router
   */
  constructor(protected router: Router) {}

  onRouteIsReady(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getAppContext(): IApiParams | undefined {
    throw new Error('Method not implemented.');
  }

  viewCacheCenter: Map<string, IApiViewController<IAppView, IApiViewState>> =
    new Map();

  route2routeObject(isRouteModal?: boolean): {
    appContext?: IApiParams;
    pathNodes: {
      viewName: string;
      context?: IApiParams;
      params?: IApiParams;
      srfnav?: string;
    }[];
  } {
    throw new Error('Method not implemented.');
  }

  routeObject2String(routePath: {
    appContext?: IApiParams;
    pathNodes: {
      viewName: string;
      context?: IApiParams;
      params?: IApiParams;
      srfnav?: string;
    }[];
  }): string {
    throw new Error('Method not implemented.');
  }

  /**
   * 登录
   *
   * @author tony001
   * @date 2024-05-14 16:05:41
   * @param {string} loginName
   * @param {string} password
   * @param {(boolean | undefined)} [remember]
   * @param {(IData | undefined)} [headers]
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  async login(
    loginName: string,
    password: string,
    remember?: boolean | undefined,
    headers?: IData | undefined,
    opts?: IData | undefined,
  ): Promise<boolean> {
    const bol = await ibiz.auth.login(loginName, password, remember, headers);
    if (bol === true) {
      window.location.hash =
        (this.router.currentRoute.value.query.ru as string) || '/';
      // 重置会话记录state,防止直接返回到登录页
      window.history.pushState({}, '');
      window.location.reload();
    }
    return bol;
  }

  /**
   * 登出
   *
   * @author tony001
   * @date 2024-05-14 16:05:02
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  async logout(opts?: IData | undefined): Promise<boolean> {
    const bol = await ibiz.auth.logout();
    if (bol) {
      const path = window.location;
      if (path.search.indexOf('isAnonymous=true') !== -1) {
        const href = `${path.origin}${path.pathname}${path.hash}`;
        window.history.replaceState({}, '', href);
      }
      await this.router.push(
        // `/login?ru=${encodeURIComponent(
        //   window.location.hash.replace('#/', '/'),
        // )}`,
        '/login',
      );
      ibiz.util.showAppLoading();
      window.location.reload();
    }
    return bol;
  }

  /**
   * 变更密码
   *
   * @author tony001
   * @date 2024-05-14 16:05:11
   * @param {string} oldPwd
   * @param {string} newPwd
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  async changePwd(
    oldPwd: string,
    newPwd: string,
    opts?: IData | undefined,
  ): Promise<IAuthResult> {
    if (this.validatePwd(oldPwd, newPwd, opts)) {
      const result = await ibiz.auth.changePwd(oldPwd, newPwd);
      return result;
    }
    return { ok: false, result: {} };
  }

  /**
   * 切换组织
   *
   * @author tony001
   * @date 2024-05-14 16:05:20
   * @param {string} oldOrgId
   * @param {string} newOrgId
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  switchOrg(
    oldOrgId: string,
    newOrgId: string,
    opts?: IData | undefined,
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  /**
   * 切换主题
   *
   * @author tony001
   * @date 2024-05-14 16:05:30
   * @param {string} oldTheme
   * @param {string} newTheme
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  switchTheme(
    oldTheme: string,
    newTheme: string,
    opts?: IData | undefined,
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  /**
   * 切换语言
   *
   * @author tony001
   * @date 2024-05-14 16:05:42
   * @param {string} oldLanguage
   * @param {string} newLanguage
   * @param {(IData | undefined)} [opts]
   * @return {*}  {Promise<boolean>}
   */
  switchLanguage(
    oldLanguage: string,
    newLanguage: string,
    opts?: IData | undefined,
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  /**
   * 校验密码
   *
   * @author tony001
   * @date 2024-05-14 17:05:31
   * @protected
   * @param {string} oldPwd
   * @param {string} newPwd
   * @param {IData} [opts={}]
   * @return {*}  {boolean}
   */
  protected validatePwd(
    oldPwd: string,
    newPwd: string,
    opts: IData = {},
  ): boolean {
    const { surePwd } = opts;
    if (!oldPwd) {
      ibiz.message.error('原密码不能为空');
      return false;
    }
    if (!newPwd) {
      ibiz.message.error('新密码不能为空');
      return false;
    }
    if (!surePwd) {
      ibiz.message.error('确认密码不能为空');
      return false;
    }
    if (oldPwd === newPwd) {
      ibiz.message.error('新密码不能与旧密码一致');
      return false;
    }
    if (newPwd !== surePwd) {
      ibiz.message.error('两次密码不一致');
      return false;
    }
    return true;
  }

  /**
   * 打开AI聊天
   *
   * @param {IAiChatParam} params
   * @return {*}  {Promise<IChatMessage[]>}
   * @memberof AppUtil
   */
  async openAiChat(params: IAiChatParam): Promise<IChatMessage[]> {
    throw new RuntimeError(ibiz.i18n.t('app.noSupport'));
  }
}
