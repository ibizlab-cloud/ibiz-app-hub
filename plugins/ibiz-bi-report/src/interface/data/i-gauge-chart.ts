import { IAppBICubeDimensionData, IAppBICubeMeasureData } from '../common';

export interface IGaugeData {
  caption: string;
  data: {
    // 指标
    measure: IAppBICubeMeasureData[] | undefined;
    // 筛选
    filter: IAppBICubeDimensionData[] | undefined;
  };
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: 'default' | 'template';
      // 配色列表
      color: string | string[];
    };
    // 字体设置
    fontSetting: {
      // 是否开启字体配置
      show: boolean;
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
    };
    // 功能设置
    featureSetting: {
      // 终点值
      endpoint: number;
    };
  };
  extend: IData;
}
