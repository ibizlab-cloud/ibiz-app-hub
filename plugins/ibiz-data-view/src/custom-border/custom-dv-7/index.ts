import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV7 } from './custom-dv-7';

export const IBizCustomDV7 = withInstall(CustomDV7, function (v: App) {
  v.component(CustomDV7.name, CustomDV7);
});

export default IBizCustomDV7;
