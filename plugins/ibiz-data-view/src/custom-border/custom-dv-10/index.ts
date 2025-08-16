import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV10 } from './custom-dv-10';

export const IBizCustomDV10 = withInstall(CustomDV10, function (v: App) {
  v.component(CustomDV10.name, CustomDV10);
});

export default IBizCustomDV10;
