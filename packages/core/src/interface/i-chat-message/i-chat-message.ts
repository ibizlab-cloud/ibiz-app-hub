import { IPortalAsyncAction } from '../api';

/**
 * @description AI聊天消息
 * @export
 * @interface IChatMessage
 */
export interface IChatMessage {
  /**
   * @description 消息标识
   * @type {string}
   * @memberof IChatMessage
   */
  messageid?: string;

  /**
   * @description 消息名称
   * @type {string}
   * @memberof IChatMessage
   */
  messagename?: string;

  /**
   * @description 消息类型
   * @type {string}
   * @memberof IChatMessage
   */
  type?: string;

  /**
   * @description 消息子类型
   * @type {string}
   * @memberof IChatMessage
   */
  subtype?: string;

  /**
   * @description 消息角色
   * @type {('ASSISTANT' | 'USER' | 'SYSTEM')} 助手 | 用户 | 系统
   * @memberof IChatMessage
   */
  role: 'ASSISTANT' | 'USER' | 'SYSTEM';

  /**
   * @description 内容摘要
   * @type {string}
   * @memberof IChatMessage
   */
  content: string;

  /**
   * @description 消息数据
   * @type {(IPortalAsyncAction | IData | string | unknown)}
   * @memberof IChatMessage
   */
  data?: IPortalAsyncAction | IData | string | unknown;

  /**
   * @description 消息路径
   * @type {string}
   * @memberof IChatMessage
   */
  url?: string;

  /**
   * @description 内容（排除排除think、resources、suggesions内容）
   * @type {string}
   * @memberof IChatMessage
   */
  realcontent?: string;
}
