import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { Namespace } from '../../utils';
import { IChatThoughtChain } from '../../interface';
import { ChevronDownSvg } from '../../icons';
import './chat-thought-chain.scss';

export interface ChatThoughtChainProps {
  /**
   * @description AI聊天思维链
   * @type {IChatThoughtChain[]}
   * @memberof ChatThoughtChainProps
   */
  items: IChatThoughtChain[];
}

export const ChatThoughtChain = (props: ChatThoughtChainProps) => {
  const { items } = props;

  const collapseIndex = useSignal<number[]>([]);

  const ns = new Namespace('chat-thought-chain');

  const nodes = useSignal<IChatThoughtChain[]>([]);

  useEffect(() => {
    nodes.value = items.filter(item => item.description);
    if (nodes.value.length > 0) {
      nodes.value.forEach((item, index) => {
        if (item.done) {
          collapseIndex.value = [...collapseIndex.value, index];
        }
      });
    }
  }, [items]);

  const onCollapse = (index: number) => {
    if (collapseIndex.value.includes(index)) {
      collapseIndex.value = collapseIndex.value.filter(
        (i: number) => i !== index,
      );
    } else {
      collapseIndex.value = [...collapseIndex.value, index];
    }
  };

  if (nodes.value.length === 0) {
    return null;
  }

  return (
    <div className={`${ns.b()} ${ns.is('single', nodes.value.length === 1)}`}>
      {nodes.value.map((item, index) => {
        if (!item.description) {
          return;
        }
        const collapsed = collapseIndex.value.includes(index);
        return (
          <div
            key={index}
            className={`${ns.e('item')} ${ns.is('collapsed', collapsed)}`}
          >
            <div className={ns.e('item-icon')}>
              {item.icon || <span>{index}</span>}
            </div>
            <div className={ns.e('item-content')}>
              <div
                className={ns.e('item-title')}
                onClick={() => onCollapse(index)}
              >
                {item.title}
                <ChevronDownSvg className={ns.e('icon')}></ChevronDownSvg>
              </div>
              <div className={ns.e('item-description')}>{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
