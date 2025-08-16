import { IAppBIReport } from '@ibiz/model-core';
import {
  NumberChartConfig,
  NumberDefaultData,
} from '../config/number-chart-config';
import { BIReportChartController } from './bi-report-chart.controller';

export class BINumberChartController extends BIReportChartController {
  /**
   * Creates an instance of BINumberChartController.
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   * @memberof BINumberChartController
   */
  constructor(
    public mode: string,
    public context: IContext,
    public viewParams: IParams,
    public config: IAppBIReport,
  ) {
    super(mode, context, viewParams, config, {
      chartModel: {},
      chartConfig: NumberChartConfig,
      chartDefaultValue: NumberDefaultData,
    });
  }

  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @param {IData} _mergeParams
   * @return {*}  {Promise<void>}
   * @memberof BINumberChartController
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
        this.state.model = this.chartModel!;
        return;
      }
      const items = await this.fetchDataSource();
      this.state.items = items;
    }
    this.refresh();
  }
}
