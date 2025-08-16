/* eslint-disable no-useless-return */
import { Signal, signal } from '@preact/signals';
import { ChatTopic } from '../../entity';
import { ITopic, ITopicOptions } from '../../interface';
import { ChatController } from '../chat/chat.controller';
import { IndexedDBUtil } from '../../utils';
import { AIChatConst } from '../../constants';

/**
 * ai话题控制器
 *
 * @author tony001
 * @date 2025-02-20 16:02:01
 * @export
 * @class AiTopicController
 */
export class AiTopicController {
  /**
   * 话题清单
   *
   * @author tony001
   * @date 2025-02-20 16:02:38
   * @type {Signal<ChatTopic[]>}
   */
  readonly topics: Signal<ChatTopic[]> = signal([]);

  /**
   * 激活话题
   *
   * @author tony001
   * @date 2025-02-24 16:02:44
   * @type {(Signal<ITopic | undefined>)}
   */
  readonly activedTopic: Signal<ITopic | undefined> = signal(undefined);

  /**
   * 当前话题配置备份
   *
   * @author tony001
   * @date 2025-02-24 16:02:28
   * @public
   * @type {(ITopicOptions | undefined)}
   */
  public currentTopicOptions: ITopicOptions | undefined;

  /**
   * Creates an instance of AiTopicController.
   * @author tony001
   * @date 2025-02-24 11:02:26
   * @param {ChatController} chat
   */
  constructor(private chat: ChatController) {}

  /**
   * 获取历史话题
   *
   * @author tony001
   * @date 2025-02-23 16:02:37
   * @return {*}  {Promise<void>}
   */
  public async fetchHistory(options: ITopicOptions): Promise<void> {
    const config = options.configService(
      options.appid,
      'aitopics',
      options.type,
    );
    const result = (await config.load()) as Array<ITopic>;
    if (result && result.length > 0) {
      result.forEach((element: ITopic) => {
        this.topics.value = [...this.topics.value, new ChatTopic(element)];
      });
    }
  }

  /**
   * 更新当前话题
   *
   * @author tony001
   * @date 2025-02-23 17:02:43
   * @param {ITopicOptions} options
   * @return {*}  {Promise<void>}
   */
  public async updateCurrentTopic(options: ITopicOptions): Promise<void> {
    this.currentTopicOptions = options;
    const chatTopicIndex = this.topics.value.findIndex(
      item => item.id === options.id,
    );
    const chatTopic = new ChatTopic(options);
    // 新建更新UI、保存
    if (chatTopicIndex !== -1) {
      this.topics.value.splice(chatTopicIndex, 1, new ChatTopic(options));
    } else {
      this.topics.value = [...this.topics.value, new ChatTopic(options)];
    }
    const result = this.topics.value.map(item => {
      return {
        appid: item.appid,
        id: item.id,
        type: item.type,
        caption: item.caption,
        sourceCaption: item.sourceCaption,
        url: item.url,
        aiChat: item.aiChat,
      };
    });
    const config = options.configService(
      options.appid,
      'aitopics',
      options.type,
    );
    await config?.save(result);
    // 设置激活项
    this.activedTopic.value = chatTopic;
  }

  /**
   * 删除话题
   *
   * @author tony001
   * @date 2025-02-24 16:02:03
   * @param {ITopicOptions} options
   * @param {object} context
   * @param {object} params
   * @param {ITopic} data
   * @param {MouseEvent} event
   * @return {*}  {Promise<void>}
   */
  public async removeTopic(
    options: ITopicOptions,
    context: object,
    params: object,
    data: ITopic,
    event: MouseEvent,
  ): Promise<void> {
    let checkResult: boolean = true;
    if (options.beforeDelete) {
      checkResult = await options.beforeDelete(context, params, data, event);
    }
    if (!checkResult) {
      return;
    }
    const chatTopicIndex = this.topics.value.findIndex(
      item => item.id === data.id,
    );
    if (chatTopicIndex !== -1) {
      this.topics.value.splice(chatTopicIndex, 1);
      this.topics.value = [...this.topics.value];
    }
    const result = this.topics.value.map(item => {
      return {
        appid: item.appid,
        id: item.id,
        type: item.type,
        caption: item.caption,
        sourceCaption: item.sourceCaption,
        url: item.url,
        aiChat: item.aiChat,
      };
    });
    const config = options.configService(
      options.appid,
      'aitopics',
      options.type,
    );
    await config?.save(result);
    // 删除本地缓存
    await IndexedDBUtil.deleteData(
      AIChatConst.DATA_BASE_NAME,
      AIChatConst.DATA_TABLE_NAME,
      data.id,
    );
    // 删除完后，当前激活项和删除的项不是同一个则切换到第一项
    if (
      this.topics.value.length > 0 &&
      data.id === this.activedTopic.value?.id
    ) {
      this.handleTopicChange(this.topics.value[0]);
    }
  }

  /**
   * 更新话题数据
   *
   * @param {ITopicOptions} options 话题配置
   * @param {ChatTopic} _data 话题数据
   * @return {*}  {Promise<void>}
   * @memberof AiTopicController
   */
  public async updateTopic(
    options: ITopicOptions,
    _data: ChatTopic,
  ): Promise<void> {
    const result = this.topics.value.map(item => {
      return {
        appid: item.appid,
        id: item.id,
        type: item.type,
        caption: item.caption,
        sourceCaption: item.sourceCaption,
        url: item.url,
        aiChat: item.aiChat,
      };
    });
    const config = options.configService(
      options.appid,
      'aitopics',
      options.type,
    );
    await config?.save(result);
  }

  /**
   * 处理选中变化
   *
   * @author tony001
   * @date 2025-02-20 19:02:27
   * @param {ChatTopic} item
   */
  public handleTopicChange(item: ChatTopic): void {
    if (this.activedTopic.value?.id === item.id) {
      return;
    }
    this.activedTopic.value = item;
    this.chat.switchAiChatController(item);
  }

  /**
   * 处理话题行为
   *
   * @author tony001
   * @date 2025-02-24 16:02:58
   * @param {string} action
   * @param {ChatTopic} topic
   * @param {MouseEvent} event
   * @return {*}  {Promise<void>}
   */
  public async handleTopicAction(
    action: string,
    topic: ChatTopic,
    event: MouseEvent,
  ): Promise<void> {
    const trigerTopic = this.topics.value.find(item => {
      return item.id === topic.id;
    });
    if (this.currentTopicOptions && trigerTopic && trigerTopic.aiChat) {
      const { context, params } = trigerTopic.aiChat;
      // 删除行为
      if (action === 'DELETE') {
        await this.removeTopic(
          this.currentTopicOptions,
          context,
          params,
          trigerTopic,
          event,
        );
      } else if (action === 'RENAME') {
        await this.updateTopic(this.currentTopicOptions, topic);
      }
      this.currentTopicOptions.action?.(action, context, params, topic, event);
    }
  }

  /**
   * 新建对话
   *
   * @author tony001
   * @date 2025-03-18 18:03:49
   * @return {*}  {Promise<void>}
   */
  public async newTopic(): Promise<void> {
    const activedTopic = this.activedTopic.value;
    if (!activedTopic) return;

    // 构建仿真数据（克隆源头数据，修改id（源头数据id@当前时间戳）和caption（源头数据标题_当前话题数量））
    // 当前激活话题的源头数据id
    const activedBaseTopicID = activedTopic.id.split('@')[0];
    const activedTopics = this.topics.value.filter(item => {
      return item.id.startsWith(activedBaseTopicID);
    });
    const options = {
      appid: activedTopic.appid,
      // 源头数据id@当前时间戳
      id: `${activedBaseTopicID}@${Date.now()}`,
      type: activedTopic.type,
      // 源头数据标题_当前话题数量(这儿源头数据可能已经被删除)
      caption: `${activedTopic.sourceCaption?.split('_')[0]}_${
        activedTopics.length
      }`,
      sourceCaption: activedTopic.sourceCaption,
      url: activedTopic.url,
      aiChat: activedTopic.aiChat,
    };
    const chatTopic = new ChatTopic(options);
    this.topics.value = [...this.topics.value, chatTopic];
    const result = this.topics.value.map(item => {
      return {
        appid: item.appid,
        id: item.id,
        type: item.type,
        caption: item.caption,
        sourceCaption: item.sourceCaption,
        url: item.url,
        aiChat: item.aiChat,
      };
    });
    // 存储数据
    const config = this.currentTopicOptions?.configService(
      options.appid,
      'aitopics',
      options.type,
    );
    await config?.save(result);
    // 切换激活
    this.handleTopicChange(chatTopic);
  }

  /**
   * 清空话题
   * - 当前激活项不清空
   * @return {*}  {Promise<void>}
   * @memberof AiTopicController
   */
  public async clearTopic(): Promise<void> {
    const actived = this.topics.value.find(
      item => item.id === this.activedTopic.value?.id,
    );
    if (!this.currentTopicOptions || !actived) return;
    let checkResult: boolean = true;
    if (this.currentTopicOptions.beforeDelete) {
      checkResult = await this.currentTopicOptions.beforeDelete(
        actived.aiChat!.context,
        actived.aiChat!.params,
        actived,
        undefined,
        true,
      );
    }
    if (!checkResult) return;
    // 删除非激活项本地缓存
    await Promise.all(
      this.topics.value.map(topic => {
        if (topic.id !== actived?.id)
          return IndexedDBUtil.deleteData(
            AIChatConst.DATA_BASE_NAME,
            AIChatConst.DATA_TABLE_NAME,
            topic.id,
          );
        return;
      }),
    );
    // 话题列表只保留激活项
    this.topics.value = actived ? [actived] : [];
    // 存储数据
    const config = this.currentTopicOptions?.configService(
      this.currentTopicOptions.appid,
      'aitopics',
      this.currentTopicOptions.type,
    );
    const result = this.topics.value.map(item => {
      return {
        appid: item.appid,
        id: item.id,
        type: item.type,
        caption: item.caption,
        sourceCaption: item.sourceCaption,
        url: item.url,
        aiChat: item.aiChat,
      };
    });
    await config?.save(result);
  }
}
