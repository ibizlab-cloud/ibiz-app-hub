import { IApiReportPanelState } from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 报表部件状态接口
 * @export
 * @interface IReportPanelState
 * @extends {IControlState}
 * @extends {IApiReportPanelState}
 */
export interface IReportPanelState
  extends IControlState,
    IApiReportPanelState {}
