import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV4 } from './custom-dv-4';

export const IBizCustomDV4 = withInstall(CustomDV4, function (v: App) {
  v.component(CustomDV4.name, CustomDV4);
});

export default IBizCustomDV4;
