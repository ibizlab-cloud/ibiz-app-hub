import { useSignal } from '@preact/signals';
import { useEffect, useMemo } from 'preact/hooks';
import { Namespace } from '../../utils';
import { ArrowDownOutlineSvg } from '../../icons';
import './chat-back-bottom.scss';

export interface ChatBackBottomProps {
  /**
   * @description 右侧距离
   * @type {number}
   * @memberof ChatBackBottomProps
   */
  right: number;

  /**
   * @description 底部距离
   * @type {number}
   * @memberof ChatBackBottomProps
   */
  bottom: number;

  /**
   * @description 滚动目标
   * @type {string}
   * @memberof ChatBackBottomProps
   */
  target: string;

  /**
   * @description 滚动高度达到此参数值才出现
   * @type {number}
   * @memberof ChatBackBottomProps
   */
  visibilityHeight?: number;
  /**
   * 点击事件
   *
   * @memberof ChatBackBottomProps
   */
  onClick?: () => void;
}

export function throttle(
  fn: (...args: unknown[]) => void | Promise<void>,
  wait: number,
): (...args: unknown[]) => void {
  let timer: unknown = null;
  return function (this: unknown, ...args: unknown[]): void {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, wait);
    }
  };
}

export const ChatBackBottom = (props: ChatBackBottomProps) => {
  // 是否显示
  const visible = useSignal(false);

  // 按钮样式
  const buttonStyle = useSignal({});

  const ns = new Namespace('chat-back-bottom');

  const container = useSignal<HTMLElement | null>(null);

  const handleScroll = () => {
    if (container.value) {
      const visibilityHeight = props.visibilityHeight || 200;
      const scrollBottom =
        container.value.scrollHeight -
        container.value.scrollTop -
        container.value.offsetHeight;
      visible.value = scrollBottom >= visibilityHeight;
    }
  };

  const handleClick = () => {
    if (container.value) {
      container.value.scrollTo({
        top: container.value.scrollHeight,
        behavior: 'smooth',
      });
      props.onClick?.();
    }
  };

  const handleScrollThrottled = throttle(handleScroll, 300);

  useMemo(() => {
    buttonStyle.value = {
      right: `${props.right}px`,
      bottom: `${props.bottom}px`,
    };
  }, [props.right, props.bottom]);

  useEffect(() => {
    if (props.target) {
      const el = document.querySelector<HTMLElement>(props.target) ?? undefined;
      if (el) {
        container.value = el;
        el.addEventListener('scroll', handleScrollThrottled);
        handleScroll();
      }
    }
  }, []);

  return (
    <div
      className={`${ns.b()} ${ns.is('visible', visible.value)}`}
      style={buttonStyle.value}
      onClick={handleClick}
    >
      <ArrowDownOutlineSvg className={ns.e('icon')}></ArrowDownOutlineSvg>
    </div>
  );
};
