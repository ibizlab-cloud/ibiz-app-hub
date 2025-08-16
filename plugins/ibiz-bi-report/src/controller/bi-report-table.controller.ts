/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppBIReport } from '@ibiz/model-core';
import { TableConfig, TableDefaultData, TableModel } from '../config';
import { IBIReportGridState } from '../interface';
import { BIReportChartController } from './bi-report-chart.controller';

/**
 * bi表格
 *
 * @author tony001
 * @date 2024-05-30 22:05:35
 * @export
 * @class BITableController
 */
export class BITableController extends BIReportChartController {
  /**
   * 初始化状态
   *
   * @type {IBIReportGridState}
   * @memberof BITableController
   */
  declare state: IBIReportGridState;

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
      chartModel: TableModel,
      chartConfig: TableConfig,
      chartDefaultValue: TableDefaultData,
    });
  }

  /**
   * 初始化状态
   *
   * @memberof BITableController
   */
  initState(): void {
    super.initState();
    this.state.style = {};
    this.state.attrs = {};
  }

  /**
   * 处理值变更
   *
   * @author tony001
   * @date 2024-06-12 17:06:03
   * @param {string} _name
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
        this.state.model = this.chartModel!;
        return;
      }
      const items = await this.fetchDataSource();
      this.state.items = items;
    }
    this.refresh();
  }
}
