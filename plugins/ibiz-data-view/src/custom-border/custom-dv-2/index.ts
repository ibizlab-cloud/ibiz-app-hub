import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV2 } from './custom-dv-2';

export const IBizCustomDV2 = withInstall(CustomDV2, function (v: App) {
  v.component(CustomDV2.name, CustomDV2);
});

export default IBizCustomDV2;
