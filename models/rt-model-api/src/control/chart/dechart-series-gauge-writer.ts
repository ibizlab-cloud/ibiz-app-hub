import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartSeriesCSNoneWriterBase } from './dechart-series-csnone-writer-base';

export class DEChartSeriesGaugeWriter extends DEChartSeriesCSNoneWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartSeriesGauge = src

    _.w(d, 'endAngle', s);
    _.w(d, 'maxValue', s);
    _.w(d, 'minValue', s);
    _.w(d, 'radius', s);
    _.w(d, 'splitNumber', s);
    _.w(d, 'startAngle', s);
    _.w(d, 'clockwise', s);

    super.onFillDSL(c, s, d);
  }
}
