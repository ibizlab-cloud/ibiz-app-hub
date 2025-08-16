import { IAppBIReport } from '@ibiz/model-core';
import {
  MultiSeriesBarChartConfig,
  MultiSeriesBarChartModel,
  MultiSeriesBarDefaultData,
} from '../config';
import { BIReportChartController } from './bi-report-chart.controller';

export class BIMultiSeriesBarChartController extends BIReportChartController {
  /**
   * Creates an instance of BIMultiSeriesBarChartController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BIMultiSeriesBarChartController
   */
  constructor(
    public mode: string,
    public context: IContext,
    public viewParams: IParams,
    public config: IAppBIReport,
  ) {
    super(mode, context, viewParams, config, {
      chartModel: MultiSeriesBarChartModel,
      chartConfig: MultiSeriesBarChartConfig,
      chartDefaultValue: MultiSeriesBarDefaultData,
    });
  }

  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}
   * @memberof BIMultiSeriesBarChartController
   */
  async handleValueChange(_name: string, _value: unknown, _mergeParams: IData) {
    super.handleValueChange(_name, _value, _mergeParams);
    // 维度和指标都存在才做处理
    if (_name.startsWith('data.') || _name.startsWith('extend')) {
      const bol = await this.checkData();
      if (!bol) {
        this.state.model = this.chartModel!;
        return;
      }
      const items = await this.fetchDataSource();
      this.state.items = items;
    }
    this.refresh();
  }
}
