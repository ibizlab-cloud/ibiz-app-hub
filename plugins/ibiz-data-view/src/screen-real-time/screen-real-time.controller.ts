import { ISpan } from '@ibiz/model-core';
import { EditorController } from '@ibiz-template/runtime';

/**
 * @description 实时时间
 * @export
 * @class DigitalFlopController
 * @extends {EditorController<ISpan>}
 */
export class ScreenRealTimeController extends EditorController<ISpan> {
  /**
   * 左侧时间
   *
   * @author fangZhiHao
   * @date 2024-08-08 13:08:33
   * @type {string}
   */
  public leftTime: string = 'YYYY-MM-DD';

  /**
   *  星期
   *
   * @author fangZhiHao
   * @date 2024-08-08 13:08:17
   * @type {string}
   */
  public showWeek: boolean = true;

  /**
   * 右侧时间
   *
   * @author fangZhiHao
   * @date 2024-08-08 13:08:33
   * @type {string}
   */
  public rightTime: string = 'HH:mm:ss';

  /**
   * 初始化
   */
  protected async onInit(): Promise<void> {
    super.onInit();
    if (this.parent.valueFormat) {
      const arr = this.parent.valueFormat.split(',');
      const index = arr.findIndex(w => w === 'week'); // 找到week

      if (index > -1) {
        this.showWeek = true;
        if (index === 0) {
          // 左侧没配 0 1
          this.leftTime = '';
          this.rightTime = arr[1];
        }
        if (index === 1) {
          // 左侧配了  0 1 ， 0 1 2
          arr.splice(index, 1);
          arr.forEach((str, i) => {
            if (i === 0) {
              this.leftTime = str;
            }
            if (i === 1) {
              this.rightTime = str;
            }
          });
        }
      } else {
        this.showWeek = false;
        // 按顺序赋值  0 2
        arr.forEach((str, i) => {
          if (i === 0) {
            this.leftTime = str;
          }
          if (i === 1) {
            this.rightTime = str;
          }
        });
      }
    }
  }
}
