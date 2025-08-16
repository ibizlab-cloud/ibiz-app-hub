import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartSeriesCSNoneWriterBase2 } from './dechart-series-csnone-writer-base2';

export class DEChartSeriesFunnelWriter extends DEChartSeriesCSNoneWriterBase2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartSeriesFunnel = src

    _.w(d, 'funnelAlign', s);
    _.w(d, 'maxSize', s);
    _.w(d, 'maxValue', s);
    _.w(d, 'minSize', s);
    _.w(d, 'minValue', s);

    super.onFillDSL(c, s, d);
  }
}
