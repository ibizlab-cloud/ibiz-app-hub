import { App, Component, createApp, KeepAlive } from 'vue';
import Vant, { allowMultipleToast } from 'vant';
import { AppHooks, piniaInstance } from '@ibiz-template/vue3-util';
import { i18n } from '../locale';
import IBizVue3 from '../ibiz-vue3';
import { loadingDirective } from '../util';

// 允许同时存在多个 toast
allowMultipleToast();

/**
 * 创建 vue3 实例，避免多实例情况下全局方法未成功挂载
 *
 * @author chitanda
 * @date 2022-12-29 11:12:25
 * @export
 * @param {Component} rootComponent
 * @param {IData} [rootProps]
 * @return {*}  {Promise<App<Element>>}
 */
export function createVueApp(
  rootComponent: Component,
  rootProps?: IData,
): App<Element> {
  const app = createApp(rootComponent, rootProps);

  app.component('KeepAlive', KeepAlive);

  // 全局 Vue 异常处理
  app.config.errorHandler = function (err: unknown): void {
    ibiz.util.error.handle(err);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const installPlugin = (_: null, plugin: any): void => {
    app.use(plugin);
  };

  AppHooks.useComponent.tap(installPlugin);

  // 模态等销毁的时候删除全局的app
  if (rootProps) {
    const oldUnMounted = rootProps.unmounted;
    // eslint-disable-next-line no-param-reassign
    rootProps.unmounted = (): void => {
      oldUnMounted();
      AppHooks.useComponent.removeTap(installPlugin);
    };
  }

  app.use(i18n);

  app.use(Vant);

  app.use(piniaInstance);

  app.use(IBizVue3);

  AppHooks.createApp.callSync(null, app);

  // loading指令
  app.directive('loading', loadingDirective);
  ibiz.plugin.register(app);
  return app;
}
