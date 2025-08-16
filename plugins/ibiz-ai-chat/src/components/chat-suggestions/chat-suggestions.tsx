/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronForwardSvg } from '../../icons';
import { IChatSuggestion } from '../../interface';
import { Namespace } from '../../utils';
import './chat-suggestions.scss';

export interface ChatSuggestionsProps {
  /**
   * 聊天建议集合
   *
   * @author tony001
   * @date 2025-03-18 14:03:17
   * @type {IChatSuggestion[]}
   */
  items: IChatSuggestion[];
  /**
   * 点击事件回调
   *
   * @author tony001
   * @date 2025-03-18 14:03:30
   */
  onItemClick?: (item: IChatSuggestion, event: MouseEvent) => void;
}

export const ChatSuggestions = (props: ChatSuggestionsProps) => {
  const { items, onItemClick } = props;

  const handleClick = (item: IChatSuggestion, event: MouseEvent) => {
    onItemClick?.(item, event);
  };

  const ns = new Namespace('chat-suggestions');

  return (
    <div className={`${ns.b()}`}>
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className={`${ns.e('item')} ${ns.is(
              'action',
              item.type === 'action',
            )}`}
            onClick={(event: MouseEvent) => handleClick(item, event)}
            title={(item.metadata as any).content_name}
          >
            {(item.metadata as any).content_name}
            <ChevronForwardSvg className={`${ns.e('item-icon')}`} />
          </div>
        );
      })}
    </div>
  );
};
