import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDecoration3 } from './custom-decoration-3';

export const IBizCustomDecoration3 = withInstall(
  CustomDecoration3,
  function (v: App) {
    v.component(CustomDecoration3.name, CustomDecoration3);
  },
);

export default IBizCustomDecoration3;
