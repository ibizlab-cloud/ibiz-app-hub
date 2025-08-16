import { CTX, GridController } from '@ibiz-template/runtime';
import { IControl } from '@ibiz/model-core';

export class CarouselGridController extends GridController {
  /**
   * 移动速度
   * DEFAULT时，表示多少秒内完整轮播一次全部数据,鼠标移上去时暂停
   * STEP: 表示每隔多少秒移动一行，不会根据鼠标是否悬浮而暂停
   *
   * @type {number}
   * @memberof CarouselGridController
   */
  public speed: number = 2;

  /**
   * 滚动方式
   *
   * @type {('DEFAULT' | 'STEP')}
   * @memberof CarouselGridController
   */
  public rollMode: 'DEFAULT' | 'STEP' = 'DEFAULT';

  constructor(model: IControl, context: IContext, params: IParams, ctx: CTX) {
    super(model, context, params, ctx);
    this.init();
  }

  public init() {
    if (this.controlParams) {
      if (this.controlParams.rollmode) {
        this.rollMode = this.controlParams.rollmode;
      }
      if (this.controlParams.speed) {
        this.speed = this.controlParams.speed;
      } else if (this.rollMode === 'DEFAULT') {
        this.speed = 12;
      } else {
        this.speed = 2;
      }
    }
  }
}
