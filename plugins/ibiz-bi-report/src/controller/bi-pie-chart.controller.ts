import { IAppBIReport } from '@ibiz/model-core';
import { PieChartConfig, PieChartModel, PieDefaultData } from '../config';
import { BIReportChartController } from './bi-report-chart.controller';

/**
 * 饼图
 *
 * @author tony001
 * @date 2024-06-12 15:06:54
 * @export
 * @class BIPieChartController
 * @extends {BIReportChartController}
 */
export class BIPieChartController extends BIReportChartController {
  /**
   * Creates an instance of BIPieChartController.
   * @author tony001
   * @date 2024-06-12 15:06:14
   * @param {string} mode
   * @param {IContext} context
   * @param {IParams} viewParams
   * @param {IAppBIReport} config
   */
  constructor(
    public mode: string,
    public context: IContext,
    public viewParams: IParams,
    public config: IAppBIReport,
  ) {
    super(mode, context, viewParams, config, {
      chartModel: PieChartModel,
      chartConfig: PieChartConfig,
      chartDefaultValue: PieDefaultData,
    });
  }

  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @param {IData} _mergeParams
   * @return {*}  {Promise<void>}
   * @memberof BIPieChartController
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
