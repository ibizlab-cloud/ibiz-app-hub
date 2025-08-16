import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDV13 } from './custom-dv-13';

export const IBizCustomDV13 = withInstall(CustomDV13, function (v: App) {
  v.component(CustomDV13.name, CustomDV13);
});

export default IBizCustomDV13;
