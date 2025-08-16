import { CTX, ListController } from '@ibiz-template/runtime';
import { IControl } from '@ibiz/model-core';

export class CarouselListController extends ListController {
  /**
   * 滚动模式
   * DEFAULT是连续滚动 STEP是一行一行滚动
   *
   * @type {('DEFAULT' | 'STEP')}
   * @memberof CarouselListController
   */
  public rollMode: 'DEFAULT' | 'STEP' = 'DEFAULT';

  /**
   * 滚动速度
   *
   * @type {number}
   * @memberof CarouselListController
   */
  public moveSpeed: number = 0;

  /**
   * 列表项边框
   *
   * @type {string}
   * @memberof CarouselListController
   */
  public borderStyle: string = '';

  constructor(model: IControl, context: IContext, params: IParams, ctx: CTX) {
    super(model, context, params, ctx);
    this.init();
  }

  /**
   * 初始化控件参数
   *
   * @memberof CarouselListController
   */
  public init() {
    if (this.controlParams) {
      if (this.controlParams.rollmode) {
        this.rollMode = this.controlParams.rollmode;
      }
      if (this.controlParams.speed) {
        this.moveSpeed = Number(this.controlParams.speed);
      } else if (this.rollMode === 'DEFAULT') {
        this.moveSpeed = 20;
      } else {
        this.moveSpeed = 2;
      }
      if (this.controlParams.borderstyle) {
        this.borderStyle = this.controlParams.borderstyle;
      }
    }
  }
}
