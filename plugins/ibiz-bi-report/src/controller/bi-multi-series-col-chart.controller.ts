import { IAppBIReport } from '@ibiz/model-core';
import {
  MultiSeriesColChartConfig,
  MultiSeriesColChartModel,
  MultiSeriesColDefaultData,
} from '../config';
import { BIReportChartController } from './bi-report-chart.controller';

export class BIMultiSeriesColChartController extends BIReportChartController {
  constructor(
    public mode: string,
    public context: IContext,
    public viewParams: IParams,
    public config: IAppBIReport,
  ) {
    super(mode, context, viewParams, config, {
      chartModel: MultiSeriesColChartModel,
      chartConfig: MultiSeriesColChartConfig,
      chartDefaultValue: MultiSeriesColDefaultData,
    });
  }

  /**
   * 处理值变更
   *
   * @author zhanghengfeng
   * @date 2024-06-14 21:06:15
   * @param {string} name
   * @param {unknown} _value
   * @return {*}  {Promise<void>}
   */
  async handleValueChange(
    _name: string,
    _value: unknown,
    _mergeParams: IData,
  ): Promise<void> {
    super.handleValueChange(_name, _value, _mergeParams);
    if (_name.startsWith('data.') || _name.startsWith('extend')) {
      const bol = await this.checkData();
      if (!bol) {
        this.state.items = [];
      } else {
        const items = await this.fetchDataSource();
        this.state.items = items;
      }
    }
    this.refresh();
  }
}
