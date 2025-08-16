import {
  RouteLocationNormalized,
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHashHistory,
} from 'vue-router';
import { Modal, RouteConst, ViewMode } from '@ibiz-template/runtime';
import { isNilOrEmpty } from 'qx-util';
import { AppRedirectView } from '@ibiz-template/vue3-util';
import qs from 'qs';
import { AuthGuard } from '../guard';
import { RouterShell, HomeView, ModalRouterShell } from '../components';
import { LoginView, View404 } from '../../view';
import { useViewStack } from '../../util';

const getPropsCallback = (depth: number) => {
  if (depth === 1) {
    return () => ({});
  }
  return () => ({
    modal: new Modal({
      mode: ViewMode.ROUTE,
      viewUsage: 1,
      routeDepth: depth,
    }),
  });
};
export class AppRouter {
  private static router?: Router;

  static getAppContext(route: RouteLocationNormalized): IParams {
    let appContext: IParams = {};
    if (
      route.params.appContext &&
      route.params.appContext !== ibiz.env.routePlaceholder
    ) {
      appContext = qs.parse(route.params.appContext as IParams, {
        strictNullHandling: true,
        delimiter: ';',
      });
    }
    return appContext;
  }

  /**
   * 创建vue路由对象
   * @author lxm
   * @date 2023-06-29 07:56:11
   * @protected
   * @static
   * @return {*}
   */
  protected static createRouter(): Router {
    // 导航守卫
    const beforeEnter: RouteRecordRaw['beforeEnter'] = async (
      _to,
      _from,
      next,
    ) => {
      // 判断是否已经登录
      if (!isNilOrEmpty(ibiz.appData)) {
        next();
      }
      const authority = await AuthGuard(this.getAppContext(_to));
      if (authority) {
        next();
      } else {
        next(false);
      }
    };

    const placeholder = ibiz.env.routePlaceholder;
    // 参数正则，占位符或者以等号相隔的参数键值对
    const paramReg = `[^/]+=[^/]+|${placeholder}`;
    // 视图正则，非=/的字符串
    const viewReg = `[^=/]+`;
    // 二级之后的子路由
    const children = [
      {
        path: '404',
        name: '404View2',
        meta: { preset: true },
        component: View404,
      },
      {
        path: `${RouteConst.ROUTE_MODAL_TAG}/:modalView(${viewReg})/:modalParams(${paramReg})`,
        components: {
          [RouteConst.ROUTE_MODAL_TAG]: ModalRouterShell,
        },
      },
      {
        path: `:view2(${viewReg})/:params2(${paramReg})`,
        component: RouterShell,
        props: getPropsCallback(2),
        children: [
          {
            path: '404',
            name: '404View3',
            meta: { preset: true },
            component: View404,
          },
          {
            path: `${RouteConst.ROUTE_MODAL_TAG}/:modalView(${viewReg})/:modalParams(${paramReg})`,
            components: {
              [RouteConst.ROUTE_MODAL_TAG]: ModalRouterShell,
            },
          },
          {
            path: `:view3(${viewReg})/:params3(${paramReg})`,
            component: RouterShell,
            props: getPropsCallback(3),
            children: [
              {
                path: '404',
                name: '404View4',
                meta: { preset: true },
                component: View404,
              },
              {
                path: `${RouteConst.ROUTE_MODAL_TAG}/:modalView(${viewReg})/:modalParams(${paramReg})`,
                components: {
                  [RouteConst.ROUTE_MODAL_TAG]: ModalRouterShell,
                },
              },
              {
                path: `:view4(${viewReg})/:params4(${paramReg})`,
                component: RouterShell,
                props: getPropsCallback(4),
              },
              {
                path: ':pathMatch(.*)*',
                redirect: { name: '404View4' },
              },
            ],
          },
          {
            path: ':pathMatch(.*)*',
            redirect: { name: '404View3' },
          },
        ],
      },
      {
        path: ':pathMatch(.*)*',
        redirect: { name: '404View2' },
      },
    ];

    return createRouter({
      // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
      history: createWebHashHistory(),
      routes: [
        {
          path: '/',
          redirect: {
            replace: true,
            path: `/${placeholder}/index/${placeholder}`,
          },
        },
        {
          path: '/login',
          name: 'loginView',
          meta: { preset: true },
          beforeEnter: async (_to, _from, next) => {
            await AuthGuard(this.getAppContext(_to), false);
            next();
          },
          component: LoginView,
        },
        {
          path: '/404',
          name: '404View1',
          meta: { preset: true },
          component: View404,
        },
        {
          path: '/appredirectview',
          name: 'appRedirectView',
          meta: { preset: true },
          beforeEnter,
          component: AppRedirectView,
        },
        {
          path: `/:appContext(${paramReg})/home/:params1(${paramReg})`,
          meta: { home: true },
          beforeEnter,
          component: HomeView,
          children,
        },
        {
          path: `/:appContext(${paramReg})/:view1(${viewReg})/:params1(${paramReg})`,
          beforeEnter,
          component: RouterShell,
          children,
        },
        {
          path: '/:pathMatch(.*)*',
          redirect: { name: '404View1' },
        },
      ],
    });
  }

  /**
   * 获取路由对象
   * @author lxm
   * @date 2023-06-29 07:56:05
   * @static
   * @return {*}
   */
  static getRouter(): Router {
    if (!this.router) {
      this.router = this.createRouter();
      // 初始化视图堆栈，监听路由
      const { init } = useViewStack();
      init(this.router);
    }
    return this.router;
  }
}
