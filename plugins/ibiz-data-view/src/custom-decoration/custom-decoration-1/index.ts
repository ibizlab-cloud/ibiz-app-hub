import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDecoration1 } from './custom-decoration-1';

export const IBizCustomDecoration1 = withInstall(
  CustomDecoration1,
  function (v: App) {
    v.component(CustomDecoration1.name, CustomDecoration1);
  },
);

export default IBizCustomDecoration1;
