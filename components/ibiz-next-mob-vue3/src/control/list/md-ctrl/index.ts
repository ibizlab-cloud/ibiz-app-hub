import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { MDCtrlControl } from './md-ctrl';
import { MDCtrlProvider } from './md-ctrl.provider';

export * from './md-ctrl.provider';

export const IBizMDCtrlControl = withInstall(MDCtrlControl, function (v: App) {
  v.component(MDCtrlControl.name, MDCtrlControl);
  registerControlProvider(ControlType.MOB_MDCTRL, () => new MDCtrlProvider());
});

export default IBizMDCtrlControl;
