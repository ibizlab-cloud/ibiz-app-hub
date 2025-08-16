import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { registerEditorProvider } from '@ibiz-template/runtime';
import { WaterLevelPond } from './water-level-pond';
import { WaterLevelPondProvider } from './water-level-pond.provider';

export const IBizWaterLevelPond = withInstall(
  WaterLevelPond,
  function (v: App) {
    v.component(WaterLevelPond.name, WaterLevelPond);
    registerEditorProvider(
      'SLIDER_WATER_LEVEL_POND',
      () => new WaterLevelPondProvider(),
    );
  },
);
