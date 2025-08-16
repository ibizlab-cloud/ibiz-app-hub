import { IAppBICubeDimensionData, IAppBICubeMeasureData } from '../common';

export interface IStackBarData {
  caption: string;
  data: {
    // 指标
    measure: IAppBICubeMeasureData[] | undefined;
    // 维度
    dimension: IAppBICubeDimensionData[] | undefined;
    // 分组
    group: IAppBICubeDimensionData[] | undefined;
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
    // 横轴
    xAxis: {
      show: true;
      // 是否显示轴标题
      showTitle: boolean;
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: 'normal' | 'bold';
        // 字体风格
        fontStyle: 'normal' | 'italic';
        // 字体大小
        fontSize: number;
        // 字体颜色
        color: string;
      };
      // 是否显示轴标签
      showLabel: boolean;
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: 'normal' | 'bold';
        // 字体风格
        fontStyle: 'normal' | 'italic';
        // 字体大小
        fontSize: number;
        // 字体颜色
        color: string;
      };
      // 是否显示轴线
      showAxisline: boolean;
      // 轴线
      axisline: {
        // 轴线粗细
        borderSize: number;
        // 轴线风格
        borderStyle: 'solid' | 'dashed' | 'doubleDashed';
        // 轴线颜色
        color: string;
      };
      // 是否显示网格线
      showGridline: boolean;
      // 网格线
      gridline: {
        // 轴线粗细
        borderSize: number;
        // 轴线风格
        borderStyle: 'solid' | 'dashed' | 'doubleDashed';
        // 轴线颜色
        color: string;
      };
    };
    yAxis: {
      show: true;
      // 是否显示轴标题
      showTitle: boolean;
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: 'normal' | 'bold';
        // 字体风格
        fontStyle: 'normal' | 'italic';
        // 字体大小
        fontSize: number;
        // 字体颜色
        color: string;
      };
      // 是否显示轴标签
      showLabel: boolean;
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: 'normal' | 'bold';
        // 字体风格
        fontStyle: 'normal' | 'italic';
        // 字体大小
        fontSize: number;
        // 字体颜色
        color: string;
      };
      // 是否显示轴线
      showAxisline: boolean;
      // 轴线
      axisline: {
        // 轴线粗细
        borderSize: number;
        // 轴线风格
        borderStyle: 'solid' | 'dashed' | 'doubleDashed';
        // 轴线颜色
        color: string;
      };
      // 是否显示网格线
      showGridline: boolean;
      // 网格线
      gridline: {
        // 轴线粗细
        borderSize: number;
        // 轴线风格
        borderStyle: 'solid' | 'dashed' | 'doubleDashed';
        // 轴线颜色
        color: string;
      };
      // 开启标签间隔
      enableLabelInterval: boolean;
      // 间隔大小
      labelInterval: number;
    };
    // 标签
    label: {
      // 是否显示标签
      show: boolean;
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
      // 标签位置
      position: 'right' | 'inside';
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
