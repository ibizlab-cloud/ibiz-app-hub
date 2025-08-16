import { IChartExpBar } from '@ibiz/model-core';
import { IExpBarControlController } from './i-exp-bar-control.controller';
import { IChartExpBarState } from '../../state';
import { IChartExpBarEvent } from '../../event';
import { IApiChartExpBarController } from '../../../api';
import { IViewController } from '../view';
import { IMDControlController } from './i-md-control.controller';

/**
 * @description 图表导航栏控制器接口
 * @export
 * @interface IChartExpBarController
 * @extends {IExpBarControlController<IChartExpBar, IChartExpBarState, IChartExpBarEvent>}
 */
export interface IChartExpBarController
  extends IExpBarControlController<
      IChartExpBar,
      IChartExpBarState,
      IChartExpBarEvent
    >,
    IApiChartExpBarController<IChartExpBar, IChartExpBarState> {
  /**
   * @description 数据部件控制器（多数据）
   * @type {IMDControlController}
   * @memberof IChartExpBarController
   */
  xDataController: IMDControlController;
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IChartExpBarController
   */
  view: IViewController;
}
