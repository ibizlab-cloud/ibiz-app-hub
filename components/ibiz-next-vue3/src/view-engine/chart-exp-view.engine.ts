import {
  ViewController,
  ViewEngineBase,
  IChartExpBarController,
  IChartExpViewEvent,
  IChartExpViewState,
} from '@ibiz-template/runtime';
import { IAppDEChartExplorerView } from '@ibiz/model-core';

export class ChartExpViewEngine extends ViewEngineBase {
  /**
   * 图表导航视图控制器
   *
   * @protected
   * @type {ViewController<
   *     IAppDEChartExplorerView,
   *     IChartExpViewState,
   *     IChartExpViewEvent
   *   >}
   * @memberof ChartExpViewEngine
   */
  protected declare view: ViewController<
    IAppDEChartExplorerView,
    IChartExpViewState,
    IChartExpViewEvent
  >;

  /**
   * 图表导航栏
   *
   * @readonly
   * @memberof ChartExpViewEngine
   */
  get chartExpBar(): IChartExpBarController {
    return this.view.getController('chartexpbar') as IChartExpBarController;
  }

  async onCreated(): Promise<void> {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push('chartexpbar');
    if (!this.view.slotProps.chartexpbar) {
      this.view.slotProps.chartexpbar = {};
    }
    this.view.slotProps.chartexpbar.srfnav = this.view.state.srfnav;
  }
}
