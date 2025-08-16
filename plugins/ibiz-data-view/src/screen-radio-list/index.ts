import { registerEditorProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { ScreenRadioList } from './screen-radio-list';
import { ScreenRadioButtonListEditorProvider } from './screen-radio-list.provider';

export const IBizScreenRadioList = withInstall(
  ScreenRadioList,
  function (v: App) {
    v.component(ScreenRadioList.name, ScreenRadioList);
    registerEditorProvider(
      'RADIOBUTTONLIST_SCREEN_RADIO_LIST',
      () => new ScreenRadioButtonListEditorProvider(),
    );
  },
);
