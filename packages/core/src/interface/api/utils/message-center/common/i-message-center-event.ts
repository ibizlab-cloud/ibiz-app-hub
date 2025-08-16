import { IPortalMessage } from './i-portal-message';

/**
 * @description 消息事件
 * @export
 * @interface IMessageCenterEvent
 */
export interface IMessageCenterEvent {
  all: (msg: IPortalMessage) => void;
}
