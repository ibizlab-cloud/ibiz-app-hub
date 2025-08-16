import { VNode } from 'preact';
import { useComputed } from '@preact/signals';
import { IChatMessage } from '../../../interface';
import { Namespace } from '../../../utils';
import { AiChatController } from '../../../controller';
import './error-message.scss';

export interface ErrorMessageProps {
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
   * 工具栏
   *
   * @type {VNode[]}
   * @memberof ErrorMessageProps
   */
  children: VNode;
}

const ns = new Namespace('error-message');

export const ErrorMessage = (props: ErrorMessageProps) => {
  const content = useComputed(() => props.message.content);
  return (
    <div className={ns.b()}>
      <div className={ns.b('header')}>
        <div className={ns.be('header', 'caption')}>AI </div>
        {props.children}
      </div>
      <div className={`${ns.e('content')} pre-wrap-container`}>
        <span>{content}</span>
      </div>
    </div>
  );
};
