import { App } from 'vue';
import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { DRBarControl } from './drbar';
import { DRBarProvider } from './drbar.provider';

export const IBizDRBarControl = withInstall(DRBarControl, function (v: App) {
  v.component(DRBarControl.name!, DRBarControl);
  registerControlProvider(ControlType.DRBAR, () => new DRBarProvider());
});

export default IBizDRBarControl;
