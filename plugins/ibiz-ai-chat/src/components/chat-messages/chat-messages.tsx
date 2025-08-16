import { useEffect, useRef, useState } from 'preact/hooks';
import { Namespace } from '../../utils';
import { AiChatController } from '../../controller';
import { IChatToolbarItem } from '../../interface';
import { ChatMessageItem } from '../chat-message-item/chat-message-item';
import { ChatToolbar } from '../chat-toolbar/chat-toolbar';
import { ChatBackBottom } from '../chat-back-bottom/chat-back-bottom';
import './chat-messages.scss';

export interface ChatMessageProps {
  /**
   * 单实例聊天总控
   *
   * @author chitanda
   * @date 2023-10-13 17:10:43
   * @type {AiChatController}
   */
  controller: AiChatController;

  /**
   * 工具项集合
   *
   * @type {IChatToolbarItem[]}
   * @memberof ChatMessageProps
   */
  toolbarItems?: IChatToolbarItem[];
}

const ns = new Namespace('chat-messages');

export const ChatMessages = (props: ChatMessageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // 是否自动滚动
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  // 标志位
  const isScrollingAutomatically = useRef(false);
  const messages = props.controller.messages;

  // 滚动到底部
  const scrollToBottom = () => {
    const container = ref.current;
    if (!container) return;
    // 设置标志位，表示当前是自动滚动
    isScrollingAutomatically.current = true;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'auto',
    });
    setTimeout(() => {
      isScrollingAutomatically.current = false;
    }, 500);
  };

  useEffect(() => {
    // 如果是自动滚动模式，则滚动到底部
    if (isAutoScroll) scrollToBottom();
  }, [messages.value]);

  // 监听滚动事件
  const handleScroll = () => {
    // 如果是自动滚动触发的，忽略此次事件
    if (isScrollingAutomatically.current) return;
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      // 接近底部的阈值
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;
      // 如果接近底部，则设置为自动滚动模式；否则设置为手动滚动模式
      setIsAutoScroll(isNearBottom);
    }
  };

  /**
   * 处理回到底部
   *
   */
  const handleBackBottom = () => {
    isScrollingAutomatically.current = true;
    setIsAutoScroll(true);
  };

  return (
    <div ref={ref} className={ns.b()} onScroll={handleScroll}>
      {messages.value.map(message => {
        const size = message.content?.length || 0;
        return message.role !== 'SYSTEM' ? (
          <ChatMessageItem
            size={size}
            message={message}
            key={message.messageid}
            controller={props.controller}
          >
            <ChatToolbar
              data={message}
              type='content'
              items={props.toolbarItems}
              controller={props.controller}
            />
          </ChatMessageItem>
        ) : null;
      })}
      <ChatBackBottom
        right={20}
        bottom={14}
        target={`.${ns.b()}`}
        onClick={handleBackBottom}
      />
    </div>
  );
};
