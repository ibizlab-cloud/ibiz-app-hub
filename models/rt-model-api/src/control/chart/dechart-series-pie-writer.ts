import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartSeriesCSNoneWriterBase2 } from './dechart-series-csnone-writer-base2';

export class DEChartSeriesPieWriter extends DEChartSeriesCSNoneWriterBase2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartSeriesPie = src

    _.w(d, 'center', s);
    _.w(d, 'minAngle', s);
    _.w(d, 'minShowLabelAngle', s);
    _.w(d, 'radius', s);
    _.w(d, 'roseType', s);
    _.w(d, 'startAngle', s);

    super.onFillDSL(c, s, d);
  }
}
