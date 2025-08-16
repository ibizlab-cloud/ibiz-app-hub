import { EventBase } from '../argument';
import { IFormEvent } from './i-form.event';

/**
 * @description 搜索表单事件
 * @primary
 * @export
 * @interface ISearchFormEvent
 * @extends {IFormEvent}
 */
export interface ISearchFormEvent extends IFormEvent {
  /**
   * @description 搜索事件
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof ISearchFormEvent
   */
  onSearch: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * @description 打开高级搜索
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof ISearchFormEvent
   */
  openAdvanceSearch: {
    event: EventBase;
    emitArgs: undefined;
  };
}
