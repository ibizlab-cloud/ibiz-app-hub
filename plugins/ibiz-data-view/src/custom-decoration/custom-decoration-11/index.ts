import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDecoration11 } from './custom-decoration-11';

export const IBizCustomDecoration11 = withInstall(
  CustomDecoration11,
  function (v: App) {
    v.component(CustomDecoration11.name, CustomDecoration11);
  },
);

export default IBizCustomDecoration11;
