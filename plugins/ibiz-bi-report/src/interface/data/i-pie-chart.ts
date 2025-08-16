import { IAppBICubeDimensionData, IAppBICubeMeasureData } from '../common';

export interface IPieData {
  caption: string;
  data: {
    // 指标
    measure: IAppBICubeMeasureData[] | undefined;
    // 维度
    dimension: IAppBICubeDimensionData[] | undefined;
    // 过滤
    filter: IAppBICubeDimensionData[] | undefined;
  };
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: 'default' | 'template';
      // 配色列表
      color: string[];
    };
    // 标签
    label: {
      // 是否显示标签
      show: boolean;
      // 是否显示百分比
      percentage: boolean;
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: 'normal' | 'bold';
        // 字体风格
        fontStyle: 'normal' | 'italic';
        // 字体大小
        fontSize: number;
        // 字体颜色
        color: string;
      };
      // 显示数据范围
      scope: 'all' | 'max_min';
    };
    // 图例
    legend: {
      // 是否显示图例
      show: boolean;
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: 'normal' | 'bold';
        // 字体风格
        fontStyle: 'normal' | 'italic';
        // 字体大小
        fontSize: number;
        // 字体颜色
        color: string;
      };
      // 图例位置
      position:
        | 'left-top'
        | 'top'
        | 'right-top'
        | 'left-bottom'
        | 'bottom'
        | 'right-bottom'
        | 'left'
        | 'right';
    };
  };
  extend: IData;
}
