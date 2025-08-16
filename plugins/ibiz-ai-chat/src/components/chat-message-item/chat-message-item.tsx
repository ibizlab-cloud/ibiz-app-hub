/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import { VNode, h } from 'preact';
import { IChatMessage } from '../../interface';
import { Namespace } from '../../utils';
import { MarkdownMessage } from './markdown-message/markdown-message';
import { UserMessage } from './user-message/user-message';
import { ErrorMessage } from './error-message/error-message';
import { UnknownMessage } from './unknown-message/unknown-message';
import { AiChatController } from '../../controller';
import './chat-message-item.scss';

export interface ChatMessageItemProps {
  /**
   * 单实例聊天总控
   *
   * @author chitanda
   * @date 2023-10-13 17:10:43
   * @type {AiChatController}
   */
  controller: AiChatController;
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
   * 插槽
   *
   * @type {VNode}
   * @memberof ChatMessageItemProps
   */
  children: VNode;
}

const ns = new Namespace('chat-message-item');

export const ChatMessageItem = (props: ChatMessageItemProps) => {
  const { message, size } = props;

  let com = null;

  switch (message.type) {
    case 'DEFAULT':
      com = message.role === 'ASSISTANT' ? MarkdownMessage : UserMessage;
      break;
    case 'ERROR':
      com = ErrorMessage;
      break;
    default:
      com = UnknownMessage;
  }

  return (
    <div className={ns.b()}>
      {h(com, {
        size,
        message,
        controller: props.controller,
        children: props.children,
      })}
    </div>
  );
};
