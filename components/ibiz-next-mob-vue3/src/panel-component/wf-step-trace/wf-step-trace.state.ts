import { PanelItemState } from '@ibiz-template/runtime';

/**
 * 流程跟踪占位状态
 *
 * @export
 * @class NavPosState
 * @extends {PanelItemState}
 */
export class WFStepTraceState extends PanelItemState {
  /**
   * 流程跟踪数据
   *
   * @author zk
   * @date 2023-07-04 01:07:30
   * @type {IData}
   * @memberof WFStepTraceState
   */
  data: IData[] = [];
}
