import { IInternalMessage } from '@ibiz-template/core';
import { InternalMessageJSON } from './internal-message-json';
import { InternalMessageDefaultProvider } from '../common';

export class InternalMessageJSONtProvider extends InternalMessageDefaultProvider {
  component = InternalMessageJSON;

  async onClick(
    message: IInternalMessage,
    event: MouseEvent,
  ): Promise<boolean> {
    const result = await super.onClick(message, event);

    // 没有url的时候看json里的redirecturl跳转
    if (!result && message.content_type === 'JSON' && message.content) {
      const json = JSON.parse(message.content);
      if (json.redirecturl) {
        this.openRedirectView(message, json.redirecturl);
        return true;
      }
    }

    return true;
  }
}
