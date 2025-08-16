import { useEffect, useRef, useState } from 'preact/hooks';
import { useComputed } from '@preact/signals';
import { Namespace, isWithinBounds, limitDraggable } from '../../utils';
import { AiChatController } from '../../controller';
import { AIChatConst } from '../../constants';
import { AISvg } from '../../icons';
import './chat-minimize.scss';

export interface ChatMinimizeProps {
  /**
   * 单实例聊天总控
   *
   * @type {AiChatController}
   * @memberof ChatMessageItemProps
   */
  controller: AiChatController;
  /**
   * 标题
   *
   * @type {string}
   * @memberof ChatMinimizeProps
   */
  title: string;
  /**
   * 是否最小化
   *
   * @type {boolean}
   * @memberof ChatMinimizeProps
   */
  isMinimize: boolean;
  /**
   * 点击
   *
   * @memberof ChatMinimizeProps
   */
  onClick: () => void;
}

const ns = new Namespace('chat-minimize');

export const ChatMinimize = (props: ChatMinimizeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // 用于显示的内容
  const [displayedContent, setDisplayedContent] = useState('');
  // 当前显示的字符索引
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * 是否在拖拽中
   */
  const isDragging = useRef(false);

  /**
   * 最小化样式
   */
  const style = {
    x: (window.innerWidth - 86) / window.innerWidth,
    y: (window.innerHeight - 86) / window.innerHeight,
  };

  /**
   * AI是否在输出中
   *
   */
  const isOutput = useComputed(() => {
    const message =
      props.controller.messages.value[
        props.controller.messages.value.length - 1
      ];
    if (!message) return false;
    return (
      message.role === 'ASSISTANT' &&
      message.state === 20 &&
      message.completed !== true
    );
  });

  /**
   * 解析内容
   *
   * @param {string} text
   * @return {*}
   */
  const parseThinkContent = (text: string) => {
    const openThinkIndex = text.indexOf('<think>');
    const closeThinkIndex = text.indexOf('</think>');

    let thoughtContent = '';
    let answerContent = '';
    if (closeThinkIndex === -1) {
      thoughtContent = text.slice(openThinkIndex + 7);
      answerContent = '';
    } else {
      thoughtContent = text.slice(openThinkIndex + 7, closeThinkIndex);
      answerContent = text.slice(closeThinkIndex + 8);
    }
    return { thoughtContent, answerContent };
  };

  /**
   * 消息内容
   *
   */
  const msgContent = useComputed(() => {
    let content: string = '';
    if (!isOutput.value) {
      // 清空显示内容
      setDisplayedContent('');
      // 重置字符索引
      setCurrentIndex(0);
      return content;
    }
    const message =
      props.controller.messages.value[
        props.controller.messages.value.length - 1
      ];
    content = message.content;
    if (message.content.indexOf('<think>') !== -1) {
      const { thoughtContent, answerContent } = parseThinkContent(
        message.content,
      );
      content = thoughtContent + answerContent;
    }
    return content;
  });

  /**
   * 设置样式
   */
  const setStyle = (): void => {
    Object.assign(ref.current!.style, {
      left: `${style.x * 100}%`,
      top: `${style.y * 100}%`,
    });
    localStorage.setItem(
      AIChatConst.MINIMIZE_STYLY_CHCHE,
      JSON.stringify(style),
    );
  };

  /**
   * 注册最小化拖拽
   *
   * @returns
   */
  const registerDragMinmize = (): void => {
    const container = ref.current;
    if (!container) return;
    container.onmousedown = (e: MouseEvent): void => {
      // 禁止选择文本，避免拖动时出现选择效果
      document.body.style.userSelect = 'none';
      const offsetX = e.clientX - container.offsetLeft;
      const offsetY = e.clientY - container.offsetTop;
      const start = Date.now();
      const onMouseMove = (evt: MouseEvent): void => {
        const width = 56 / window.innerWidth;
        const height = 56 / window.innerHeight;
        const { x, y } = limitDraggable(
          evt.clientX - offsetX,
          evt.clientY - offsetY,
          width,
          height,
        );
        Object.assign(style, { x, y });
        requestAnimationFrame(() => {
          setStyle();
        });
      };
      const onMouseUp = (): void => {
        // 恢复选择文本功能
        const end = Date.now();
        // 鼠标按下到抬起的时间超过300毫秒则认定为拖拽中
        isDragging.current = end - start > 300;
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  };

  /**
   * 处理点击
   *
   * @returns
   */
  const handleClick = (): void => {
    if (isDragging.current) return;
    props.onClick();
  };

  useEffect(() => {
    const cache = localStorage.getItem(AIChatConst.MINIMIZE_STYLY_CHCHE);
    if (cache) {
      const data = JSON.parse(cache);
      if (isWithinBounds(data)) Object.assign(style, data);
    }
    setStyle();
    registerDragMinmize();
  }, []);

  useEffect(() => {
    // 监听消息内容，以打字机的方式展示字符串类容
    if (currentIndex < msgContent.value.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => prev + msgContent.value[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100); // 每个字符的显示间隔时间（100ms）
      // 清理定时器
      return () => clearTimeout(timer);
    }
  }, [currentIndex, msgContent.value]);

  return (
    <div
      ref={ref}
      title={props.title}
      className={`${ns.b()} ${ns.is('hidden', !props.isMinimize)} ${ns.is(
        'show-halo',
        isOutput.value,
      )}`}
      onClick={handleClick}
    >
      <div
        className={`${ns.e('content')} ${ns.is(
          'show-border',
          !isOutput.value,
        )}`}
      >
        {displayedContent && (
          <div className={`${ns.em('content', 'popover')}`}>
            <div className='typewriter'>{displayedContent}</div>
          </div>
        )}
        <AISvg />
      </div>
    </div>
  );
};
