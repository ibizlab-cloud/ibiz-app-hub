import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { CustomButton } from './custom-button';
import { CustomBtnProvider } from './custom-button.provider';

export const IBizCustomButton = withInstall(CustomButton, function (v: App) {
  v.component(CustomButton.name, CustomButton);
  registerPanelItemProvider('CUSTOM_CUSTOM_BTN', () => new CustomBtnProvider());
});
