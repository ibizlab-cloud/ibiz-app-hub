import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPortletProvider } from '@ibiz-template/runtime';
import { CustomImageSearchBox } from './custom-image-search-box';
import { CustomImageSearchBoxEditorProvider } from './custom-image-search-box.provider';

export const IBizCustomImageSearchBox = withInstall(
  CustomImageSearchBox,
  (v: App) => {
    v.component(CustomImageSearchBox.name, CustomImageSearchBox);
    registerPortletProvider(
      'EDITOR_CUSTOMSTYLE_CUSTOM_IMAGE_SEARCH_BOX',
      () => new CustomImageSearchBoxEditorProvider(),
    );
  },
);
