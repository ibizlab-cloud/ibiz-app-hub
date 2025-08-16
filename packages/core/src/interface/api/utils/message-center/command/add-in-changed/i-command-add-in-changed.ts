import { ICommandBase } from '../i-command-base';
import { IAddInChanged } from './i-add-in-changed';
/**
 * @description 添加变更指令消息控制器
 * @export
 * @interface ICommandAddInChanged
 * @extends {ICommandBase}
 */
export interface ICommandAddInChanged extends ICommandBase {
  /**
   * @description 发送消息
   * @param {IAddInChanged} data
   * @memberof ICommandAddInChanged
   */
  send(data: IAddInChanged): void;
}
