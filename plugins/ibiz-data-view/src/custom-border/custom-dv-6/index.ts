import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV6 } from './custom-dv-6';

export const IBizCustomDV6 = withInstall(CustomDV6, function (v: App) {
  v.component(CustomDV6.name, CustomDV6);
});

export default IBizCustomDV6;
