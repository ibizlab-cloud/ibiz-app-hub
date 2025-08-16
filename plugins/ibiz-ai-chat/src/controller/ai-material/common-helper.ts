/* eslint-disable @typescript-eslint/no-explicit-any */
import { IChatToolbarItem } from '../../interface';
import { MaterialHelper } from './material-helper';

export class CommonHelper extends MaterialHelper {
  /**
   * 执行操作
   *
   * @author tony001
   * @date 2025-02-28 15:02:48
   * @return {*}  {Promise<void>}
   */
  async excuteAction(
    event: MouseEvent,
    item?: IChatToolbarItem,
  ): Promise<void> {
    let result: any;
    if (item && item.onClick && typeof item.onClick === 'function') {
      result = await item.onClick(
        event,
        item,
        this.aiChat.context,
        this.aiChat.params,
      );
    } else {
      const extendToolbarClick = this.aiChat.opts.extendToolbarClick;
      if (extendToolbarClick) {
        result = await extendToolbarClick(
          event,
          item!,
          this.aiChat.context,
          this.aiChat.params,
          {},
        );
      } else {
        console.error('未找到扩展工具栏点击事件');
      }
    }
    if (result && result.data && result.data.length > 0) {
      const tempData = result.data[0];
      const material = {
        id: tempData.id,
        type: tempData.type,
        data: tempData.data || {},
        metadata: tempData.metadata || {},
      };
      if (item!.id) {
        Object.assign(material.metadata, { actionId: item!.id });
      }
      this.aiChat.addMaterial(material);
    }
  }
}
