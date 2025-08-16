import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { CustomDecoration5 } from './custom-decoration-5';

export const IBizCustomDecoration5 = withInstall(
  CustomDecoration5,
  function (v: App) {
    v.component(CustomDecoration5.name, CustomDecoration5);
  },
);

export default IBizCustomDecoration5;
