import {
  IApiCalendarGroup,
  IApiCalendarItemData,
  IApiCalendarState,
} from '../../../api';
import { IMDControlState } from './i-md-control.state';

/**
 * @description 日历分组数据接口
 * @export
 * @interface ICalendarGroup
 * @extends {IApiCalendarGroup}
 */
export interface ICalendarGroup extends IApiCalendarGroup {}

/**
 * @description  日历部件状态接口
 * @export
 * @interface ICalendarState
 * @extends {IMDControlState}
 * @extends {IApiCalendarState}
 */
export interface ICalendarState extends IMDControlState, IApiCalendarState {
  /**
   * @description 日历项数据
   * @type {IApiCalendarItemData[]}
   * @memberof ICalendarState
   */
  items: IApiCalendarItemData[];

  /**
   * @description 日历分组数据
   * @type {IApiCalendarGroup[]}
   * @memberof ICalendarState
   */
  groups: IApiCalendarGroup[];

  /**
   * @description 是否弹框显示详情
   * @type {boolean}
   * @memberof ICalendarState
   */
  showDetail: boolean;
}

/**
 * @description 日历项数据接口
 * @export
 * @interface ICalendarItemData
 */
export interface ICalendarItemData extends IApiCalendarItemData {}
