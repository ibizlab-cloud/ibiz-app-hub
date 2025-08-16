import {
  CoreConst,
  OrgData,
  getAppCookie,
  setAppCookie,
} from '@ibiz-template/core';
import { ModelHelper } from '@ibiz-template/model-helper';
import { mergeDeepRight } from 'ramda';
import { AppHooks } from '@ibiz-template/vue3-util';
import { updateDevToolConfig } from '@ibiz-template/devtool';
import { i18n } from '../../../locale';
import { AuthGuardHooks } from '../auth-guard-hooks';

/**
 * 加载应用数据
 *
 * @author chitanda
 * @date 2022-07-20 20:07:50
 * @return {*}  {Promise<void>}
 */
async function loadAppData(): Promise<void> {
  const res = await ibiz.net.get('/appdata');
  if (res.ok) {
    ibiz.appData = res.data;
    updateDevToolConfig();
  }
}

/**
 * 加载组织数据
 *
 * @author chitanda
 * @date 2022-07-20 20:07:44
 * @return {*}  {Promise<void>}
 */
async function loadOrgData(): Promise<void> {
  const res = await ibiz.net.get(`/uaa/getbydcsystem/${ibiz.env.dcSystem}`);
  if (res.ok) {
    const orgDataItems = res.data as OrgData[];
    if (orgDataItems) {
      const [data] = orgDataItems;
      ibiz.orgData = data;
    }
  }
}

/**
 * 设置token刷新定时器
 *
 * @author lxm
 * @date 2023-02-13 09:09:23
 */
function setRefreshToken(): void {
  const token = getAppCookie(CoreConst.TOKEN);
  const expirein = getAppCookie(CoreConst.TOKEN_EXPIRES);
  if (token && expirein) {
    // 计算到过期时间所需的延时毫秒数，预留提前量
    let wait = Number(expirein) - new Date().getTime();
    const early = 5 * 60 * 1000;
    wait = wait > early ? wait - early : 0;
    setTimeout(async () => {
      const res = await ibiz.net.get(`/uaa/refreshtoken2`);
      if (res.ok) {
        setAppCookie(CoreConst.TOKEN, res.data.token, 0);
        const expiredDate =
          new Date().getTime() + (res.data.expirein || 7199) * 1000;
        setAppCookie(CoreConst.TOKEN_EXPIRES, `${expiredDate}`, 0);
      }
      // 下一次延时做准备
      setRefreshToken();
    }, wait);
  }
}

/**
 * 加载主题插件
 *
 * @author chitanda
 * @date 2023-12-03 01:12:38
 * @protected
 * @return {*}  {Promise<void>}
 */
async function loadTheme(): Promise<void> {
  const app = ibiz.hub.getApp();
  const uiThemes = app.model.appUIThemes || [];
  if (uiThemes.length > 0) {
    // 加载颜色主题
    const colorThemes = uiThemes.filter(uiTheme => {
      return (
        uiTheme.themeParams && uiTheme.themeParams['icon-theme'] !== 'true'
      );
    });
    if (colorThemes.length > 0) {
      const colorTheme = colorThemes[0];
      await ibiz.util.theme.loadTheme(colorTheme);
    }
    // 加载图标主题
    const iconThemes = uiThemes.filter(uiTheme => {
      return (
        uiTheme.themeParams && uiTheme.themeParams['icon-theme'] === 'true'
      );
    });
    if (iconThemes.length > 0) {
      const iconTheme = iconThemes[0];
      await ibiz.util.theme.loadTheme(iconTheme, 'ICON');
    }
  }
}

let helper: ModelHelper | undefined;

/**
 * 初始化模型
 *
 * @author tony001
 * @date 2024-11-12 18:11:26
 * @param {IParams} appContext
 * @param {boolean} [permission=true] 无权限和有权限的模型
 * @return {*}  {Promise<void>}
 */
async function initModel(
  appContext: IParams,
  permission: boolean = true,
): Promise<void> {
  if (!helper) {
    helper = new ModelHelper(
      async url => {
        if (ibiz.env.isLocalModel) {
          const res = await ibiz.net.getModel(`./model${url}`);
          return res.data;
        }
        const res = await ibiz.net.get(
          `${ibiz.env.remoteModelUrl}${url}`,
          undefined,
          permission ? {} : { srfdcsystem: ibiz.env.dcSystem },
        );
        return res.data;
      },
      ibiz.env.appId,
      appContext,
      permission,
    );
    const app = await ibiz.hub.getAppAsync(ibiz.env.appId);
    const appModel = app.model;
    ibiz.env.isMob = appModel.mobileApp === true;
    if (ibiz.env.isEnableMultiLan) {
      const lang = ibiz.i18n.getLang();
      const m = await helper.getPSAppLang(lang.replace('-', '_').toUpperCase());
      const items = m.languageItems || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = {};
      items.forEach(item => {
        data[item.lanResTag!] = item.content;
      });
      i18n.global.mergeLocaleMessage(lang, data);
    }

    const module = await import('@ibiz-template/mob-theme');
    const theme = module.default || module;
    AppHooks.useComponent.callSync(null, theme);
    if (appModel.appUIThemes) {
      await loadTheme();
    }
    // 设置浏览器标题
    if (app.model.title) {
      ibiz.util.setBrowserTitle('');
    }
  }
}

/**
 * 根据应用自定义参数解析成环境变量
 *
 * @author chitanda
 * @date 2023-11-24 19:11:50
 * @return {*}  {Promise<void>}
 */
async function initEnvironment(): Promise<void> {
  if (helper) {
    const app = await helper.getAppModel();
    const userParam = app.userParam;
    if (userParam) {
      Object.keys(userParam).forEach(key => {
        const value = ibiz.util.rawValue.format(userParam[key]);
        const keys = key.split('.');
        let currentObj = ibiz.env as IData;
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          if (i === keys.length - 1) {
            currentObj[k] = value;
          } else {
            currentObj[k] = currentObj[k] || {};
            currentObj = currentObj[k];
          }
        }
      });
      if (ibiz.env.globalConfig) {
        ibiz.config = mergeDeepRight(ibiz.config, ibiz.env.globalConfig);
      }
    }
  }
}

/**
 * 应用参数初始化
 *
 * @author tony001
 * @date 2024-11-12 18:11:00
 * @param {IParams} appContext
 * @return {*}  {Promise<void>}
 */
async function appInit(appContext: IParams): Promise<void> {
  await AuthGuardHooks.beforeAuth.call(null, null);
  if (ibiz.env.isSaaSMode === true) {
    await loadOrgData();
  }
  await loadAppData();
  await AuthGuardHooks.afterAuth.call(null, null);
  await initModel(appContext);
  await initEnvironment();
  setRefreshToken();
}

/**
 * 应用权限守卫
 *
 * @author tony001
 * @date 2024-11-12 18:11:07
 * @export
 * @param {IParams} appContext
 * @param {boolean} [permission=true]
 * @return {*}  {Promise<boolean>}
 */
export async function AuthGuard(
  appContext: IParams,
  permission: boolean = true,
): Promise<boolean> {
  if (permission) {
    let result = true;
    try {
      await appInit(appContext);
    } catch (error) {
      result = false;
      ibiz.util.error.handle(error);
    }
    return result;
  }
  await initModel(appContext, false);
  return true;
}
