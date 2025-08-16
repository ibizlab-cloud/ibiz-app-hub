import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import {
  registerInternalMessageProvider,
  registerPanelItemProvider,
} from '@ibiz-template/runtime';
import { MobUserMessageProvider } from './user-message.provider';
import { MobUserMessage } from './user-message';
import {
  InternalMessageContainer,
  InternalMessageDefault,
  InternalMessageDefaultProvider,
} from './common';
import { InternalMessageJSON } from './internal-message-json/internal-message-json';
import { InternalMessageHTML } from './internal-message-html/internal-message-html';
import { InternalMessageText } from './internal-message-text/internal-message-text';
import { InternalMessageJSONtProvider } from './internal-message-json/internal-message-json.provider';
import { InternalMessageHTMLtProvider } from './internal-message-html/internal-message-html.provider';
import { InternalMessageTextProvider } from './internal-message-text/internal-message-text.provider';

export const IBizMobUserMessage = withInstall(
  MobUserMessage,
  function (v: App) {
    v.component(MobUserMessage.name, MobUserMessage);
    registerPanelItemProvider(
      'RAWITEM_USERMESSAGE',
      () => new MobUserMessageProvider(),
    );
    v.component(InternalMessageContainer.name, InternalMessageContainer);
    v.component(InternalMessageDefault.name, InternalMessageDefault);
    v.component(InternalMessageJSON.name, InternalMessageJSON);
    v.component(InternalMessageHTML.name, InternalMessageHTML);
    v.component(InternalMessageText.name, InternalMessageText);

    // 注册站内信适配器
    registerInternalMessageProvider(
      'DEFAULT',
      () => new InternalMessageDefaultProvider(),
    );

    registerInternalMessageProvider(
      'JSON',
      () => new InternalMessageJSONtProvider(),
    );

    registerInternalMessageProvider(
      'HTML',
      () => new InternalMessageHTMLtProvider(),
    );

    registerInternalMessageProvider(
      'TEXT',
      () => new InternalMessageTextProvider(),
    );
  },
);

export default IBizMobUserMessage;
