import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV1 } from './custom-dv-1';

export const IBizCustomDV1 = withInstall(CustomDV1, function (v: App) {
  v.component(CustomDV1.name, CustomDV1);
});

export default IBizCustomDV1;
