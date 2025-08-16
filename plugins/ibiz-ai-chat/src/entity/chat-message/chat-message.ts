/* eslint-disable no-useless-escape */
import { IChatMessage } from '../../interface';

/**
 * 消息实体
 *
 * @author chitanda
 * @date 2023-10-09 16:10:45
 * @export
 * @class ChatMessage
 * @implements {IMessage}
 */
export class ChatMessage implements IChatMessage {
  get messageid(): IChatMessage['messageid'] {
    return this.msg.messageid;
  }

  get state(): IChatMessage['state'] {
    return this.msg.state;
  }

  get role(): IChatMessage['role'] {
    return this.msg.role;
  }

  get type(): IChatMessage['type'] {
    return this.msg.type;
  }

  get realcontent(): IChatMessage['realcontent'] {
    let str = this.msg.content;
    // <think>相关内容移除（助手开头）
    if (str.indexOf('<think>') !== -1 && str.indexOf('</think>') === -1) {
      return '';
    }
    str = str.replace(/\<think\>[^]*?\<\/think\>/gs, '').trim();
    // <resources>相关内容（用户开头）
    if (
      str.indexOf('<resources>') !== -1 &&
      str.indexOf('</resources>') === -1
    ) {
      return '';
    }
    str = str.replace(/\<resources\>[^]*?\<\/resources\>/gs, '').trim();
    // <suggestions>相关内容（助手结束）
    const firstSuggestionIndex = str.indexOf('<suggestions>');
    if (firstSuggestionIndex !== -1) {
      str = str.substring(0, firstSuggestionIndex).trim();
    }
    return str;
  }

  get content(): IChatMessage['content'] {
    return this.msg.content;
  }

  get completed(): IChatMessage['completed'] {
    return this.msg.completed;
  }

  get suggestions(): IChatMessage['suggestions'] {
    return this.msg.suggestions;
  }

  get _origin(): IChatMessage {
    return this.msg;
  }

  constructor(protected msg: IChatMessage) {}

  /**
   * 更新消息
   *
   * @author chitanda
   * @date 2023-10-10 17:10:07
   * @param {IChatMessage} msg
   */
  update(msg: IChatMessage): void {
    if (!msg.content) {
      msg.content = '';
    }
    // 接收到新的<think>（思考的开始标识）内容后清除前面的所有内容
    if (msg.content.indexOf('<think>') !== -1 && this.msg.content) {
      this.msg.content = '';
    }
    this.msg.content += msg.content;
  }

  /**
   * 更新消息完成状态
   *
   * @author tony001
   * @date 2025-02-25 17:02:31
   * @param {boolean} completed
   */
  updateCompleted(completed: boolean): void {
    this.msg.completed = completed;
  }
}
