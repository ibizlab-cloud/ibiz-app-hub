import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV3 } from './custom-dv-3';

export const IBizCustomDV3 = withInstall(CustomDV3, function (v: App) {
  v.component(CustomDV3.name, CustomDV3);
});

export default IBizCustomDV3;
