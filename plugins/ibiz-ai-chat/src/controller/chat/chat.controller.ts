import { render, h } from 'preact';
import { ChatContainer } from '../../components';
import { IContainerOptions } from '../../interface';
import { AiTopicController } from '../ai-topic/ai-topic.controller';
import { AiChatController } from '../ai-chat/ai-chat.controller';
import { ChatTopic } from '../../entity';
import { IndexedDBUtil } from '../../utils';
import { AIChatConst } from '../../constants';

/**
 * 聊天器控制器
 *
 * @author chitanda
 * @date 2023-10-13 17:10:47
 * @export
 * @class ChatController
 */
export class ChatController {
  /**
   * 聊天框容器
   *
   * @author chitanda
   * @date 2023-10-13 17:10:03
   * @protected
   * @type {HTMLDivElement}
   */
  protected container?: HTMLDivElement;

  /**
   * 默认模式（聊天框）和话题模式（支持多话题切换），聊天框为默认模式
   *
   * @author tony001
   * @date 2025-02-20 16:02:50
   * @protected
   * @type {('DEFAULT' | 'TOPIC')}
   */
  protected mode: 'DEFAULT' | 'TOPIC' = 'DEFAULT';

  /**
   * 是否挂载ai话题
   *
   * @author tony001
   * @date 2025-02-23 16:02:54
   * @protected
   * @type {boolean}
   */
  protected isMountedAiTopic: boolean = false;

  /**
   * 容器配置备份
   *
   * @author tony001
   * @date 2025-02-24 11:02:49
   * @protected
   * @type {(IContainerOptions | undefined)}
   */
  protected backupChatOptions: IContainerOptions | undefined;

  /**
   * 话题控制器
   *
   * @author tony001
   * @date 2025-02-23 16:02:56
   * @public
   * @type {AiTopicController}
   */
  public aiTopic: AiTopicController;

  /**
   * 聊天控制器
   *
   * @readonly
   * @type {(AiChatController | undefined)}
   * @memberof ChatController
   */
  public get aiChat(): AiChatController | undefined {
    return this.aiTopicMap.get(`${this.aiTopic.activedTopic.value?.id}`);
  }

  /**
   * 话题map
   *
   * @private
   * @type {Map<string, AiChatController>}
   * @memberof ChatController
   */
  private aiTopicMap: Map<string, AiChatController> = new Map();

  /**
   * Creates an instance of ChatController.
   * @author tony001
   * @date 2025-02-24 11:02:20
   */
  constructor() {
    this.aiTopic = new AiTopicController(this);
  }

  /**
   * 初始化IndexDB
   *
   * @author tony001
   * @date 2025-02-24 18:02:50
   * @return {*}  {Promise<void>}
   */
  async initIndexDB(): Promise<void> {
    const bol = await IndexedDBUtil.checkTableExists(
      AIChatConst.DATA_BASE_NAME,
      AIChatConst.DATA_TABLE_NAME,
    );
    if (!bol) {
      await IndexedDBUtil.createTable(
        AIChatConst.DATA_BASE_NAME,
        AIChatConst.DATA_TABLE_NAME,
        AIChatConst.DATA_TABLE_KEY_NAME,
        false,
      );
    }
  }

  /**
   * 创建聊天窗口(会同时显示出来)
   *
   * @author tony001
   * @date 2025-02-24 12:02:58
   * @param {IContainerOptions} opts
   * @return {*}  {Promise<AiChatController>}
   */
  async create(opts: IContainerOptions): Promise<AiChatController> {
    await this.initIndexDB();
    this.backupChatOptions = opts;
    this.close();
    this.container = document.createElement('div');
    this.container.classList.add('ibiz-ai-chat');
    document.body.appendChild(this.container);

    const chatOptions = opts.chatOptions;
    let topicOptions;

    if (opts.mode && opts.mode === 'TOPIC') {
      // 未挂载ai话题控制器先挂载
      if (!this.isMountedAiTopic) {
        await this.aiTopic.fetchHistory(opts.topicOptions!);
        this.isMountedAiTopic = true;
      }
      // 更新当前话题
      topicOptions = opts.topicOptions!;
      Object.assign(topicOptions, {
        aiChat: {
          caption: chatOptions.caption,
          context: chatOptions.context,
          params: chatOptions.params,
          appDataEntityId: chatOptions.appDataEntityId,
          contentToolbarItems: chatOptions.contentToolbarItems,
          footerToolbarItems: chatOptions.footerToolbarItems,
          questionToolbarItems: chatOptions.questionToolbarItems,
          otherToolbarItems: chatOptions.otherToolbarItems,
          appendCurData: chatOptions.appendCurData,
          appendCurContent: chatOptions.appendCurContent,
        },
      });
      await this.aiTopic.updateCurrentTopic(topicOptions);
    } else {
      this.aiTopic.activedTopic.value = undefined;
    }

    Object.assign(chatOptions, {
      topicId: topicOptions?.id,
      topic: topicOptions,
    });

    const aiChat = new AiChatController(chatOptions);

    this.aiTopicMap.set(`${topicOptions?.id}`, aiChat);

    render(
      h(ChatContainer, {
        aiChat,
        aiTopic: this.aiTopic,
        mode: opts.mode ? opts.mode : 'DEFAULT',
        containerOptions: opts.containerOptions,
        caption:
          opts.mode && opts.mode === 'TOPIC' ? 'AI助手' : chatOptions.caption,
        enableBackFill: opts.containerOptions?.enableBackFill,
        contentToolbarItems: chatOptions.contentToolbarItems,
        footerToolbarItems: chatOptions.footerToolbarItems,
        questionToolbarItems: chatOptions.questionToolbarItems,
        close: () => {
          this.close();
          if (chatOptions.closed) {
            chatOptions.closed(chatOptions.context, chatOptions.params);
          }
        },
        fullscreen: (target: boolean) => {
          if (chatOptions.fullscreen) {
            chatOptions.fullscreen(
              target,
              chatOptions.context,
              chatOptions.params,
            );
          }
        },
        minimize: (target: boolean) => {
          if (chatOptions.minimize) {
            chatOptions.minimize(
              target,
              chatOptions.context,
              chatOptions.params,
            );
          }
        },
      }),
      this.container,
    );
    return aiChat;
  }

  /**
   * 切换聊天控制器
   *
   * @author tony001
   * @date 2025-02-24 11:02:24
   * @param {ChatTopic} topic
   */
  public switchAiChatController(topic: ChatTopic): void {
    const opts = {
      ...this.backupChatOptions!.chatOptions,
    };
    if (topic.aiChat) {
      Object.assign(opts, {
        caption: topic.aiChat.caption,
        context: topic.aiChat.context,
        params: topic.aiChat.params,
        contentToolbarItems: topic.aiChat.contentToolbarItems,
        footerToolbarItems: topic.aiChat.footerToolbarItems,
        questionToolbarItems: topic.aiChat.questionToolbarItems,
        otherToolbarItems: topic.aiChat.otherToolbarItems,
        appendCurData: topic.aiChat.appendCurData,
        appendCurContent: topic.aiChat.appendCurContent,
        appDataEntityId: topic.aiChat.appDataEntityId,
        topicId: topic.id,
        topic,
        extendToolbarClick:
          this.backupChatOptions!.chatOptions.extendToolbarClick,
        recommendPrompt: this.backupChatOptions!.chatOptions.recommendPrompt,
      });
    }
    let aiChat: AiChatController;
    if (this.aiTopicMap.has(`${topic.id}`)) {
      aiChat = this.aiTopicMap.get(`${topic.id}`)!;
    } else {
      aiChat = new AiChatController(opts);
      this.aiTopicMap.set(`${topic.id}`, aiChat);
    }
    if (this.container) {
      render(null, this.container);
      render(
        h(ChatContainer, {
          aiChat,
          aiTopic: this.aiTopic,
          mode: this.backupChatOptions?.mode
            ? this.backupChatOptions.mode
            : 'DEFAULT',
          containerOptions: this.backupChatOptions?.containerOptions,
          caption:
            this.backupChatOptions?.mode &&
            this.backupChatOptions.mode === 'TOPIC'
              ? 'AI助手'
              : opts.caption,
          enableBackFill:
            this.backupChatOptions?.containerOptions?.enableBackFill,
          contentToolbarItems: opts.contentToolbarItems,
          footerToolbarItems: opts.footerToolbarItems,
          questionToolbarItems: opts.questionToolbarItems,
          close: () => {
            this.close();
            if (opts.closed) {
              opts.closed(opts.context, opts.params);
            }
          },
          fullscreen: (target: boolean) => {
            if (opts.fullscreen) {
              opts.fullscreen(target, opts.context, opts.params);
            }
          },
          minimize: (target: boolean) => {
            if (opts.minimize) {
              opts.minimize(target, opts.context, opts.params);
            }
          },
        }),
        this.container,
      );
    }
  }

  /**
   * 隐藏聊天窗口(必须先创建)
   *
   * @author chitanda
   * @date 2023-10-13 17:10:55
   */
  hidden(): void {
    if (this.container) {
      this.container.style.display = 'none';
    }
  }

  /**
   * 显示聊天窗窗口(必须先创建)
   *
   * @author chitanda
   * @date 2023-10-13 17:10:29
   */
  show(): void {
    if (this.container) {
      this.container.style.display = 'flex';
    }
  }

  /**
   * 关闭聊天窗口
   *
   * @author chitanda
   * @date 2023-10-13 17:10:10
   */
  close(): void {
    if (this.container) {
      render(null, this.container);
      this.container.remove();
      this.container = undefined;
    }
  }
}

// 唯一实例
const chat = new ChatController();

export { chat };
