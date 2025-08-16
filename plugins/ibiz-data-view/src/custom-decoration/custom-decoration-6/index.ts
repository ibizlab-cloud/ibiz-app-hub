import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDecoration6 } from './custom-decoration-6';

export const IBizCustomDecoration6 = withInstall(
  CustomDecoration6,
  function (v: App) {
    v.component(CustomDecoration6.name, CustomDecoration6);
  },
);

export default IBizCustomDecoration6;
