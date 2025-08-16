import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDecoration4 } from './custom-decoration-4';

export const IBizCustomDecoration4 = withInstall(
  CustomDecoration4,
  function (v: App) {
    v.component(CustomDecoration4.name, CustomDecoration4);
  },
);

export default IBizCustomDecoration4;
