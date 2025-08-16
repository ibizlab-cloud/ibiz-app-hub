import {
  ViewController,
  IChartViewEvent,
  IChartViewState,
  MDViewEngine,
  IChartController,
} from '@ibiz-template/runtime';
import { IAppDEChartView } from '@ibiz/model-core';

export class ChartViewEngine extends MDViewEngine {
  protected declare view: ViewController<
    IAppDEChartView,
    IChartViewState,
    IChartViewEvent
  >;

  /**
   * 多数据部件名称
   * @author lxm
   * @date 2023-06-07 09:17:19
   * @readonly
   * @type {string}
   */
  get xdataControlName(): string {
    return 'chart';
  }

  get chart(): IChartController {
    return this.view.getController('chart') as IChartController;
  }

  async onCreated(): Promise<void> {
    await super.onCreated();
    if (!this.view.slotProps.chart) {
      this.view.slotProps.chart = {};
    }
  }
}
