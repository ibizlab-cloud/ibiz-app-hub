import { IAppBIReport } from '@ibiz/model-core';
import { GaugeChartConfig, GaugeChartModel, GaugeDefaultData } from '../config';
import { BIReportChartController } from './bi-report-chart.controller';

/**
 * 仪表盘控制器
 *
 * @export
 * @class BIGaugeChartController
 * @extends {BIReportChartController}
 */
export class BIGaugeChartController extends BIReportChartController {
  constructor(
    public mode: string,
    public context: IContext,
    public viewParams: IParams,
    public config: IAppBIReport,
  ) {
    super(mode, context, viewParams, config, {
      chartModel: GaugeChartModel,
      chartConfig: GaugeChartConfig,
      chartDefaultValue: GaugeDefaultData,
    });
  }

  /**
   * 处理值变更
   *
   * @param {string} _name
   * @param {unknown} _value
   * @param {IData} _mergeParams
   * @return {*}  {Promise<void>}
   * @memberof BIGaugeChartController
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

  /**
   * 获取数据集
   *
   * @author zhanghengfeng
   * @date 2024-06-14 21:06:24
   * @return {*}  {Promise<IData[]>}
   */
  async fetchDataSource(): Promise<IData[]> {
    const data = await super.fetchDataSource();
    const key =
      this.state.reportModel.appBIReportMeasures?.[0].measureTag || '';
    const name =
      this.state.reportModel.appBIReportMeasures?.[0].measureName || '';
    if (data && key) {
      const sum = data.reduce((pre, cur) => {
        return pre + parseFloat(`${cur[key] || 0}`);
      }, 0);
      return [
        {
          $catalog: name,
          [key]: sum,
        },
      ];
    }
    return [];
  }
}
