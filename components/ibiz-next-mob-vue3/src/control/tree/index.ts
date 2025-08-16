import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { App, defineAsyncComponent } from 'vue';
import { ControlLoadingPlaceholder } from '@ibiz-template/vue3-util';
import { TreeProvider } from './tree.provider';

export * from './tree.provider';

export const IBizTreeControl = {
  install: (v: App): void => {
    v.component(
      'IBizTreeControl',
      defineAsyncComponent({
        loader: () => import('./tree'),
        loadingComponent: ControlLoadingPlaceholder,
        delay: 0,
      }),
    );
    registerControlProvider(ControlType.TREEVIEW, () => new TreeProvider());
  },
};

export default IBizTreeControl;
