import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV11 } from './custom-dv-11';

export const IBizCustomDV11 = withInstall(CustomDV11, function (v: App) {
  v.component(CustomDV11.name, CustomDV11);
});

export default IBizCustomDV11;
