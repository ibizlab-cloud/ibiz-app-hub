import { PanelItemState } from '@ibiz-template/runtime';

/**
 * 分页面板状态
 *
 * @author tony001
 * @date 2024-05-12 14:05:01
 * @export
 * @class PanelTabPanelState
 * @extends {PanelItemState}
 */
export class PanelTabPanelState extends PanelItemState {
  /**
   * 当前激活分页
   *
   * @author tony001
   * @date 2024-05-12 14:05:36
   * @type {string}
   */
  activeTab: string = '';
}
