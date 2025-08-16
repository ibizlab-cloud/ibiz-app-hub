import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { registerEditorProvider } from '@ibiz-template/runtime';
import { ScreenRealTime } from './screen-real-time';
import { ScreenRealTimeProvider } from './screen-real-time.provider';

export const IBizScreenRealTime = withInstall(
  ScreenRealTime,
  function (v: App) {
    v.component(ScreenRealTime.name, ScreenRealTime);
    registerEditorProvider(
      'SPAN_SCREEN_REAL_TIME',
      () => new ScreenRealTimeProvider(),
    );
  },
);
