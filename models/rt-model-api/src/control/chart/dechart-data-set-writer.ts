import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartObjectWriterBase } from './dechart-object-writer-base';

export class DEChartDataSetWriter extends DEChartObjectWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartDataSet = src

    _.v(
      d,
      'chartDataSetFields',
      c.m('control.chart.ChartDataSetField[]', s, 'getPSChartDataSetFields'),
    );

    super.onFillDSL(c, s, d);
  }
}
