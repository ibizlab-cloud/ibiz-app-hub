import { PanelItemState } from '@ibiz-template/runtime';

/**
 * 多项数据容器状态
 *
 * @author lxm
 * @date 2023-02-07 06:04:27
 * @export
 * @class MultiDataContainerState
 * @extends {PanelItemState}
 */
export class MultiDataContainerState extends PanelItemState {
  /**
   * @description 多项数据容器数据
   * @exposedoc
   * @type {(IData | IData[])}
   */
  items: IData[] = [];
}
