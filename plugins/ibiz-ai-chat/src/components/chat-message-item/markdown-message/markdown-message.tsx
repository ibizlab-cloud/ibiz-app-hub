/* eslint-disable no-nested-ternary */
import { VNode } from 'preact';
import Cherry from 'cherry-markdown';
import { useSignal } from '@preact/signals';
import { useEffect, useMemo } from 'preact/hooks';
import { Namespace, createUUID } from '../../../utils';
import {
  IChatMessage,
  IChatSuggestion,
  IChatThoughtChain,
} from '../../../interface';
import { AiChatController } from '../../../controller';
import { ChatThoughtChain } from '../../chat-thought-chain/chat-thought-chain';
import { CheckMarkCircleSvg, LoadingSvg } from '../../../icons';
import { ChatSuggestions } from '../../chat-suggestions/chat-suggestions';
import './markdown-message.scss';

export interface MarkdownMessageProps {
  /**
   * 单实例聊天总控
   *
   * @author chitanda
   * @date 2023-10-13 17:10:43
   * @type {AiChatController}
   */
  controller: AiChatController;
  /**
   * 消息
   *
   * @author tony001
   * @date 2025-03-18 14:03:38
   * @type {IChatMessage}
   */
  message: IChatMessage;
  /**
   * 内容大小，用于更新绘制
   *
   * @author chitanda
   * @date 2023-10-15 21:10:22
   * @type {number}
   */
  size: number;
  /**
   * 工具栏
   *
   * @type {VNode}
   * @memberof MarkdownMessageProps
   */
  children: VNode;
}

/**
 * 解析结果
 *
 * @author tony001
 * @date 2025-02-25 14:02:46
 * @interface ParseResult
 */
interface IParseResult {
  /**
   * 是否思考完成
   *
   * @author tony001
   * @date 2025-02-25 15:02:31
   * @type {boolean}
   */
  isThoughtCompleted: boolean;
  /**
   * 思维链内容
   *
   * @author tony001
   * @date 2025-02-25 14:02:57
   * @type {string}
   */
  thoughtContent: string;

  /**
   * 答案内容
   *
   * @author tony001
   * @date 2025-02-25 14:02:09
   * @type {string}
   */
  answerContent: string;
}

const ns = new Namespace('markdown-message');

export const MarkdownMessage = (props: MarkdownMessageProps) => {
  const { message, size } = props;

  const uuid = useSignal(createUUID());

  const cherry = useSignal<Cherry | null>(null);

  // 是否loadding
  const isLoadding = useMemo(() => {
    return message.state === 20 && message.completed !== true;
  }, [message.state, message.completed]);

  // 是否显示超时异常
  const isTimeOut = useMemo(() => {
    return message.state === 20 && message.completed === true;
  }, [message.state, message.completed]);

  // 思维链界面数据
  const thoughtChain = useSignal<IChatThoughtChain>({
    title: '',
    description: '',
    icon: <LoadingSvg></LoadingSvg>,
  });

  // 聊天建议界面数据
  const chatSuggestion = useSignal<{
    hasSuggestions: boolean;
    suggestions: IChatSuggestion[];
  }>({ hasSuggestions: false, suggestions: [] });
  // 更新聊天建议界面数据
  const updateChatSuggestion = (suggestions: IChatSuggestion[] | undefined) => {
    if (suggestions && suggestions.length > 0) {
      chatSuggestion.value = {
        hasSuggestions: true,
        suggestions,
      };
    } else {
      chatSuggestion.value = { hasSuggestions: false, suggestions: [] };
    }
  };
  // 聊天建议点击
  const handleSuggestionClick = (item: IChatSuggestion, event: MouseEvent) => {
    props.controller.handleSuggestionClick(props.message, item, event);
  };

  /**
   * 解析回答内容
   *
   * @author tony001
   * @date 2025-02-25 15:02:03
   * @param {string} text
   * @return {*}  {IParseResult}
   */
  const parseThinkContent = (text: string): IParseResult => {
    const openThinkIndex = text.indexOf('<think>');
    const closeThinkIndex = text.indexOf('</think>');

    let thoughtContent = '';
    let answerContent = '';
    let isThoughtCompleted = false;
    if (closeThinkIndex === -1) {
      isThoughtCompleted = false;
      thoughtContent = text.slice(openThinkIndex + 7);
      answerContent = '';
    } else {
      isThoughtCompleted = true;
      thoughtContent = text.slice(openThinkIndex + 7, closeThinkIndex);
      answerContent = text.slice(closeThinkIndex + 8);
    }
    return { isThoughtCompleted, thoughtContent, answerContent };
  };

  useEffect(() => {
    if (size >= 0 && cherry.value) {
      // 返回数据存在思维链
      if (message.content.indexOf('<think>') !== -1) {
        const { isThoughtCompleted, thoughtContent, answerContent } =
          parseThinkContent(message.content);
        if (isThoughtCompleted) {
          thoughtChain.value.icon = <CheckMarkCircleSvg />;
          thoughtChain.value.title = '思考完成';
        } else if (message.completed === true) {
          thoughtChain.value.icon = <CheckMarkCircleSvg />;
          thoughtChain.value.title = '思考已停止';
        } else {
          thoughtChain.value.icon = <LoadingSvg />;
          thoughtChain.value.title = '思考中...';
        }
        thoughtChain.value.description = thoughtContent || '';
        cherry.value.setMarkdown(answerContent || '');
      } else {
        cherry.value.setMarkdown(message.content || '');
      }
      // 更新建议
      updateChatSuggestion(message.suggestions);
    }
  }, [message, size]);

  useEffect(() => {
    let content = '';
    if (message.content.indexOf('<think>') !== -1) {
      const { isThoughtCompleted, thoughtContent, answerContent } =
        parseThinkContent(message.content);
      thoughtChain.value = {
        title: isThoughtCompleted
          ? '思考完成'
          : message.completed === true
          ? '思考已停止'
          : '思考中...',
        description: thoughtContent || '',
        icon:
          isThoughtCompleted || message.completed === true ? (
            <CheckMarkCircleSvg />
          ) : (
            <LoadingSvg />
          ),
      };
      if (answerContent) {
        content = answerContent;
      }
    } else {
      content = message.content;
    }
    // 更新建议
    updateChatSuggestion(message.suggestions);
    cherry.value = new Cherry({
      id: uuid,
      value: content || '',
      editor: {
        defaultModel: 'previewOnly',
      },
      themeSettings: {
        // 目前应用的主题
        mainTheme: 'dark',
        codeBlockTheme: 'dark',
      },
      previewer: {
        // 默认禁用
        enablePreviewerBubble: false,
      },
      engine: {
        syntax: {
          table: {
            enableChart: false,
            externals: ['echarts'],
          },
        },
      },
    });
  }, []);

  return (
    <div className={`${ns.b()} ${ns.is('loading', isLoadding)}`}>
      <div className={ns.b('header')}>
        <div className={ns.be('header', 'caption')}>AI </div>
        {props.children}
        {isTimeOut ? (
          <div className={ns.be('header', 'timeout')}>请求超时</div>
        ) : null}
      </div>
      <div className={`${ns.b('content')} pre-wrap-container`}>
        <ChatThoughtChain items={[thoughtChain.value]}></ChatThoughtChain>
        <div id={uuid} />
      </div>
      <div className={ns.b('footer')}>
        {chatSuggestion.value.hasSuggestions ? (
          <ChatSuggestions
            items={chatSuggestion.value.suggestions}
            onItemClick={(item: IChatSuggestion, event: MouseEvent) => {
              handleSuggestionClick(item, event);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
