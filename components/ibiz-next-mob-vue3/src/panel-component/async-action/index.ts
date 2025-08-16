import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import {
  registerAsyncActionProvider,
  registerPanelItemProvider,
} from '@ibiz-template/runtime';
import { MobAsyncActionProvider } from './mob-async-action.provider';
import { MobAsyncAction } from './mob-async-action';
import { AsyncAction } from './async-action/async-action';
import { AsyncActionTab } from './async-action-tab/async-action-tab';
import { AsyncActionProvider } from './async-action/async-action.provider';

export const IBizMobAsyncAction = withInstall(
  MobAsyncAction,
  function (v: App) {
    v.component(MobAsyncAction.name, MobAsyncAction);
    registerPanelItemProvider(
      'RAWITEM_ASYNCACTION',
      () => new MobAsyncActionProvider(),
    );
    v.component(AsyncAction.name, AsyncAction);
    v.component(AsyncActionTab.name, AsyncActionTab);

    // 注册异步导入操作适配器
    registerAsyncActionProvider(
      'DEIMPORTDATA2',
      () => new AsyncActionProvider(),
    );
    registerAsyncActionProvider('DEFAULT', () => new AsyncActionProvider());
  },
);

export default IBizMobAsyncAction;
