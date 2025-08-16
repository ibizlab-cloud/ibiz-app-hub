import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV8 } from './custom-dv-8';

export const IBizCustomDV8 = withInstall(CustomDV8, function (v: App) {
  v.component(CustomDV8.name, CustomDV8);
});

export default IBizCustomDV8;
