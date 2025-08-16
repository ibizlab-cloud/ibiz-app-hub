import { ControlType, registerControlProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { ToolbarControl } from './toolbar';
import { ToolbarProvider } from './toolbar.provider';

export const IBizToolbarControl = withInstall(
  ToolbarControl,
  function (v: App) {
    v.component(ToolbarControl.name, ToolbarControl);
    registerControlProvider(ControlType.TOOLBAR, () => new ToolbarProvider());
  },
);

export default IBizToolbarControl;
