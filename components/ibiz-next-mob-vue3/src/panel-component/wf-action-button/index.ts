import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import WFActionButton from './wf-action-button';
import { WFActionButtonProvider } from './wf-action-button.provider';

export * from './wf-action-button.provider';
export * from './wf-action-button.controller';

export const IBizWFActionButton = withInstall(
  WFActionButton,
  function (v: App) {
    v.component(WFActionButton.name, WFActionButton);
    registerPanelItemProvider(
      'RAWITEM_WF_ACTION_BUTTON',
      () => new WFActionButtonProvider(),
    );
  },
);

export default IBizWFActionButton;
