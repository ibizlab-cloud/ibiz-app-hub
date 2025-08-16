import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV5 } from './custom-dv-5';

export const IBizCustomDV5 = withInstall(CustomDV5, function (v: App) {
  v.component(CustomDV5.name, CustomDV5);
});

export default IBizCustomDV5;
