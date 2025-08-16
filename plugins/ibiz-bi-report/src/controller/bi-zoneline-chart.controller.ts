import { IAppBIReport } from '@ibiz/model-core';
import {
  ZoneLineChartConfig,
  ZoneLineChartModel,
  ZoneLineDefaultData,
} from '../config/zone-line-chart-config';
import { BIReportChartController } from './bi-report-chart.controller';

export class BIZoneLineChartController extends BIReportChartController {
  /**
   * Creates an instance of BIZoneChartController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BIZoneChartController
   */
  constructor(
    public mode: string,
    public context: IContext,
    public viewParams: IParams,
    public config: IAppBIReport,
  ) {
    super(mode, context, viewParams, config, {
      chartModel: ZoneLineChartModel,
      chartConfig: ZoneLineChartConfig,
      chartDefaultValue: ZoneLineDefaultData,
    });
  }

  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @return {*}
   * @memberof BIZoneChartController
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
