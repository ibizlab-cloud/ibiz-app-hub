import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV9 } from './custom-dv-9';

export const IBizCustomDV9 = withInstall(CustomDV9, function (v: App) {
  v.component(CustomDV9.name, CustomDV9);
});

export default IBizCustomDV9;
