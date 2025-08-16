import { ITopic } from '../../interface';

/**
 * 话题实体
 *
 * @author tony001
 * @date 2025-02-20 16:02:29
 * @export
 * @class ChatTopic
 * @implements {ITopic}
 */
export class ChatTopic implements ITopic {
  get appid(): ITopic['appid'] {
    return this.data.appid;
  }

  get id(): ITopic['id'] {
    return this.data.id;
  }

  get type(): ITopic['type'] {
    return this.data.type;
  }

  get caption(): ITopic['caption'] {
    return this.data.caption;
  }

  get sourceCaption(): ITopic['sourceCaption'] {
    return this.data.sourceCaption || this.caption;
  }

  get url(): ITopic['url'] {
    return this.data.url;
  }

  get aiChat(): ITopic['aiChat'] {
    return this.data.aiChat;
  }

  constructor(public data: ITopic) {}
}
