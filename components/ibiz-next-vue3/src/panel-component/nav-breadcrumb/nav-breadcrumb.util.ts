import { IAppFunc, IAppMenuItem } from '@ibiz/model-core';
import { Router } from 'vue-router';
import { route2routePath, IRoutePath } from '@ibiz-template/vue3-util';
import { RouteConst } from '@ibiz-template/runtime';
import { BreadcrumbMsg } from './nav-breadcrumb.state';

/**
 * @description 获取首页导航信息
 * @export
 * @return {*}  {BreadcrumbMsg}
 */
export function getIndexBreadcrumb(context: IContext): BreadcrumbMsg {
  const app = ibiz.hub.getApp(context.srfappid);
  const caption = app.model.caption;
  return {
    viewName: ibiz.hub.defaultAppIndexViewName,
    fullPath: '/',
    caption,
  };
}

/**
 * @description 根据视图名获取应用功能
 * @export
 * @param {string} name
 * @param {string} appid
 * @return {*}  {(IAppFunc | undefined)}
 */
export function getAppFuncByViewName(
  name: string,
  appid: string,
): IAppFunc | undefined {
  const app = ibiz.hub.getApp(appid);
  const appFuncs = app.model.appFuncs || [];
  const item = appFuncs.find(func => {
    const { appViewId = '' } = func;
    const viewName = appViewId.split('.').pop();
    return viewName?.toLowerCase() === name.toLowerCase();
  });
  return item;
}

/**
 * @description 根据应该功能获取菜单模型
 * @export
 * @param {IAppFunc} func
 * @param {IAppMenuItem[]} appMenuItems
 * @return {*}  {IAppMenuItem[]}
 */
export function getMenuItemsByAppFunc(
  func: IAppFunc,
  appMenuItems: IAppMenuItem[],
): IAppMenuItem[] {
  const result: IAppMenuItem[] = [];
  const findMenuItem = (
    menuItems: IAppMenuItem[],
  ): IAppMenuItem | undefined => {
    return menuItems.find(item => {
      if (item.appFuncId && item.appFuncId === func.id) {
        result.unshift(item);
        return true;
      }
      if (item.appMenuItems && item.appMenuItems.length > 0) {
        const menuItem = findMenuItem(item.appMenuItems);
        if (menuItem) {
          result.unshift(item);
          return true;
        }
      }
      return false;
    });
  };
  findMenuItem(appMenuItems);
  return result;
}

/**
 * @description 获取当前视图名称
 * @export
 * @param {Router} router
 * @return {*}  {string}
 */
export function getCurViewName(router: Router): string {
  const { currentRoute } = router;
  const routePath: IRoutePath = route2routePath(currentRoute.value);
  return routePath.pathNodes.pop()?.viewName || '';
}

/**
 * @description 从视图堆栈中查找视图信息
 * @export
 * @param {string} viewName
 * @return {*}  {(IData | undefined)}
 */
export function getViewInfoByViewStack(viewName: string): IData | undefined {
  if (viewName === RouteConst.ROUTE_MODAL_TAG) {
    return {
      viewName,
      fullPath: '',
      isModal: true,
    };
  }
  const view = ibiz.util.viewStack.getViewByCodeName(viewName);
  if (view) {
    // 识别嵌入视图
    let isEmbed = false;
    if (
      view.parentView &&
      view.parentView.model.codeName !== ibiz.hub.defaultAppIndexViewName
    ) {
      isEmbed = true;
    }
    return {
      viewName: view.model.codeName!,
      caption: view.model.caption,
      isEmbed,
    };
  }
}
