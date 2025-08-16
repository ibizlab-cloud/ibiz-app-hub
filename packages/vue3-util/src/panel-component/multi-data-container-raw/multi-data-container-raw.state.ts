import { PanelItemState } from '@ibiz-template/runtime';

/**
 * 多项数据容器状态
 *
 * @author zzq
 * @date 2024-09-09 16:04:27
 * @export
 * @class MultiDataContainerRawState
 * @extends {PanelItemState}
 */
export class MultiDataContainerRawState extends PanelItemState {
  /**
   * @description 多项数据容器数据
   * @exposedoc
   * @type {(IData | IData[])}
   */
  items: IData[] = [];
}
