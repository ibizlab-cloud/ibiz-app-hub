import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDecoration2 } from './custom-decoration-2';

export const IBizCustomDecoration2 = withInstall(
  CustomDecoration2,
  function (v: App) {
    v.component(CustomDecoration2.name, CustomDecoration2);
  },
);

export default IBizCustomDecoration2;
