import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  Router,
} from 'vue-router';
import qs from 'qs';
import { AppRedirectView } from '@ibiz-template/vue3-util';
import { RouteConst } from '@ibiz-template/runtime';
import NProgress from 'nprogress';
import { LoginView, ErrorView } from '../../view';
import { ModalRouterShell, RouterShell } from '../components';
import { ShareView } from '../../view/share-view/share-view';
import 'nprogress/nprogress.css';

export class AppRouter {
  private static router?: Router;

  private static authGuard: (
    context: IParams,
    notLogin?: boolean,
  ) => Promise<boolean>;

  static setAuthGuard(
    authGuard: (context: IParams, notLogin?: boolean) => Promise<boolean>,
  ): void {
    this.authGuard = authGuard;
  }

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

  static getRouter(): Router {
    const placeholder = ibiz.env.routePlaceholder;
    // 参数正则，占位符或者以等号相隔的参数键值对
    const paramReg = `[^/]+=[^/]+|${placeholder}`;
    // 视图正则，非=/的字符串
    const viewReg = `[^=/]+`;
    if (!this.router) {
      this.router = createRouter({
        // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
        history: createWebHashHistory(),
        routes: [
          {
            path: '/',
            redirect: `/${placeholder}/index/${placeholder}`,
          },
          {
            path: '/login',
            name: 'loginView',
            beforeEnter: async (_to, _from, next): Promise<void> => {
              await this.authGuard(this.getAppContext(_to), false);
              next();
            },
            component: LoginView,
          },
          {
            path: '/share',
            name: 'shareView',
            beforeEnter: async (_to, _from, next): Promise<void> => {
              const authority = await this.authGuard(this.getAppContext(_to));
              if (authority) {
                next();
              } else {
                next(false);
              }
            },
            component: ShareView,
          },
          {
            path: '/error/:code',
            name: 'errorView1',
            component: ErrorView,
          },
          {
            path: '/appredirectview',
            name: 'appRedirectView',
            beforeEnter: async (_to, _from, next): Promise<void> => {
              const authority = await this.authGuard(this.getAppContext(_to));
              if (authority) {
                next();
              } else {
                next(false);
              }
            },
            component: AppRedirectView,
          },
          {
            path: `/:appContext(${paramReg})/:view1(${viewReg})/:params1(${paramReg})`,
            beforeEnter: async (_to, _from, next): Promise<void> => {
              const authority = await this.authGuard(this.getAppContext(_to));
              if (authority) {
                next();
              } else {
                next(false);
              }
            },
            component: RouterShell,
            children: [
              {
                path: 'error/:code',
                name: 'errorView2',
                component: ErrorView,
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
                children: [
                  {
                    path: 'error/:code',
                    name: 'errorView3',
                    component: ErrorView,
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
                    children: [
                      {
                        path: 'error/:code',
                        name: 'errorView4',
                        component: ErrorView,
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
                        children: [
                          {
                            path: 'error/:code',
                            name: 'errorView5',
                            component: ErrorView,
                          },
                          {
                            path: `${RouteConst.ROUTE_MODAL_TAG}/:modalView(${viewReg})/:modalParams(${paramReg})`,
                            components: {
                              [RouteConst.ROUTE_MODAL_TAG]: ModalRouterShell,
                            },
                          },
                          {
                            path: `:view5(${viewReg})/:params5(${paramReg})`,
                            component: RouterShell,
                            children: [
                              {
                                path: 'error/:code',
                                name: 'errorView6',
                                component: ErrorView,
                              },
                              {
                                path: `${RouteConst.ROUTE_MODAL_TAG}/:modalView(${viewReg})/:modalParams(${paramReg})`,
                                components: {
                                  [RouteConst.ROUTE_MODAL_TAG]:
                                    ModalRouterShell,
                                },
                              },
                              {
                                path: `:view6(${viewReg})/:params6(${paramReg})`,
                                component: RouterShell,
                                children: [
                                  {
                                    path: 'error/:code',
                                    name: 'errorView7',
                                    component: ErrorView,
                                  },
                                  {
                                    path: `${RouteConst.ROUTE_MODAL_TAG}/:modalView(${viewReg})/:modalParams(${paramReg})`,
                                    components: {
                                      [RouteConst.ROUTE_MODAL_TAG]:
                                        ModalRouterShell,
                                    },
                                  },
                                  {
                                    path: `:view7(${viewReg})/:params7(${paramReg})`,
                                    component: RouterShell,
                                    children: [
                                      {
                                        path: 'error/:code',
                                        name: 'errorView8',
                                        component: ErrorView,
                                      },
                                      {
                                        path: `${RouteConst.ROUTE_MODAL_TAG}/:modalView(${viewReg})/:modalParams(${paramReg})`,
                                        components: {
                                          [RouteConst.ROUTE_MODAL_TAG]:
                                            ModalRouterShell,
                                        },
                                      },
                                      {
                                        path: `:view8(${viewReg})/:params8(${paramReg})`,
                                        component: RouterShell,
                                      },
                                      {
                                        path: ':pathMatch(.*)*',
                                        redirect: { name: 'errorView8' },
                                      },
                                    ],
                                  },
                                  {
                                    path: ':pathMatch(.*)*',
                                    redirect: { name: 'errorView7' },
                                  },
                                ],
                              },
                              {
                                path: ':pathMatch(.*)*',
                                redirect: { name: 'errorView6' },
                              },
                            ],
                          },
                          {
                            path: ':pathMatch(.*)*',
                            redirect: { name: 'errorView5' },
                          },
                        ],
                      },
                      {
                        path: ':pathMatch(.*)*',
                        redirect: { name: 'errorView4' },
                      },
                    ],
                  },
                  {
                    path: ':pathMatch(.*)*',
                    redirect: { name: 'errorView3' },
                  },
                ],
              },
              {
                path: ':pathMatch(.*)*',
                redirect: { name: 'errorView2' },
              },
            ],
          },
          {
            path: '/:pathMatch(.*)*',
            redirect: { name: 'errorView1' },
          },
        ],
      });

      // 路由加载前
      this.router.beforeEach((_to, _from, next) => {
        NProgress.configure({ showSpinner: false });
        NProgress.start();
        next();
      });

      // 路由加载后
      this.router.afterEach(() => {
        NProgress.done();
      });
    }
    return this.router;
  }
}
