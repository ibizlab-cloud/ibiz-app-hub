/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { IBIReportChartController, IChartConverter } from '../interface';

export class BaseConverter implements IChartConverter {
  /**
   * 图例间隔
   *
   * @type {number}
   * @memberof BaseConverter
   */
  legendGap: number = 20;

  /**
   * Creates an instance of BaseConverter.
   * @param {IBIReportChartController} controller
   * @memberof BaseConverter
   */
  constructor(protected controller: IBIReportChartController) {}

  /**
   * 转化数据到模型
   *
   * @author tony001
   * @date 2024-06-25 17:06:45
   * @param {(IData | undefined)} data
   * @param {IModel} model
   * @param {(IData | undefined)} [opts]
   * @return {*}  {(Promise<IModel | undefined>)}
   */
  async translateDataToModel(
    data: IData | undefined,
    model: IModel,
    opts?: IData | undefined,
  ): Promise<IModel | undefined> {
    throw new Error('Method not implemented.');
  }

  /**
   * 获取图例参数
   *
   * @type {number}
   * @memberof BaseConverter
   */
  getLegendOPtions(position: string) {
    const options: IData = {
      type: 'scroll',
    };
    if (position === 'left' || position === 'right') {
      options.orient = 'vertical';
      options[position] = this.legendGap;
      options.top = 'middle';
    }
    if (position === 'top' || position === 'bottom') {
      options.left = 'center';
      options.top = position;
    }
    if (position === 'left-top') {
      options.left = this.legendGap;
      options.top = 'top';
    }
    if (position === 'right-top') {
      options.right = this.legendGap;
      options.top = 'top';
    }
    if (position === 'left-bottom') {
      options.left = this.legendGap;
      options.top = 'bottom';
    }
    if (position === 'right-bottom') {
      options.right = this.legendGap;
      options.top = 'bottom';
    }
    return options;
  }

  /**
   * 获取图表默认配置
   *
   * @type {number}
   * @memberof BaseConverter
   */
  getDefaultGridOptions(position: string = '') {
    const gridOptions: IData = {
      show: false,
      left: '5%',
      right: '5%',
    };
    // 左上、右上、上时只改变底部
    if (['left-top', 'right-top', 'top'].includes(position)) {
      gridOptions.bottom = 70;
    }
    // 左下、右下、下时只改变顶部
    if (['left-bottom', 'right-bottom', 'bottom'].includes(position)) {
      gridOptions.top = 30;
    }
    // 左侧改变上下、右（饼图、雷达图）
    if (position === 'left') {
      gridOptions.top = 30;
      gridOptions.bottom = 70;
      gridOptions.right = 0;
    }
    // 右侧改变上下、左（饼图、雷达图）
    if (position === 'right') {
      gridOptions.top = 30;
      gridOptions.bottom = 70;
      gridOptions.let = 0;
    }
    return JSON.stringify(gridOptions);
  }

  /**
   * @description x轴标签
   * @return {*}
   * @memberof BaseConverter
   */
  axisLabel() {
    const options: IData = {};
    options.formatter = `function(param) {
      if (param && param.includes(' ')) {
        const time = new Date(param);
        if (time.toString() !== 'Invalid Date') {
          return time.toLocaleDateString().replaceAll('/','-');
        }
      }
      return param.split('_').pop();
    }`;
    return options;
  }

  /**
   * 使用间隔的时候加上省略限制
   *
   * @param {boolean} [tag=false]
   * @return {*}
   * @memberof BaseConverter
   */
  computeLabelEllipsis(tag: boolean = false, labelInterval: number = 1) {
    if (tag) {
      return {
        width: 60 * (labelInterval > 0 ? labelInterval : 1),
        overflow: 'truncate',
        ellipsis: '...',
      };
    }
    return {};
  }

  /**
   * 计算轴应用
   *
   * @param {IData} series
   * @param {IData} uiModel
   * @param {boolean} [isRow=false]
   * @return {*}
   * @memberof BaseConverter
   */
  computeAxisLayout(series: IData, uiModel: IData, isRow: boolean = false) {
    const axisIndex = uiModel.extend?.[`axis@${series.valueField}`];
    if (axisIndex === 'RIGHT') {
      if (isRow) {
        return { 'EC.xAxisIndex': 1 };
      }
      return { 'EC.yAxisIndex': 1 };
    }
    return {};
  }
}
