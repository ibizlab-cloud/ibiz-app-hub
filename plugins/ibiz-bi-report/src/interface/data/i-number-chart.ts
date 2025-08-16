import { IAppBICubeDimensionData, IAppBICubeMeasureData } from '../common';

export interface INumberData {
  caption: string;
  data: {
    measure: IAppBICubeMeasureData[] | undefined;
    period: IAppBICubeDimensionData[] | undefined;
    filter: IAppBICubeDimensionData[] | undefined;
  };
  style: {
    font: {
      show: Boolean;
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
    yoy: {
      show: Boolean;
      yoy: Array<string>;
    };
    qoq: {
      show: Boolean;
      qoq: Array<string>;
    };
  };
  extend: IData;
}
