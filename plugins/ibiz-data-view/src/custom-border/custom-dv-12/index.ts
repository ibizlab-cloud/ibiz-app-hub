import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV12 } from './custom-dv-12';

export const IBizCustomDV12 = withInstall(CustomDV12, function (v: App) {
  v.component(CustomDV12.name, CustomDV12);
});

export default IBizCustomDV12;
