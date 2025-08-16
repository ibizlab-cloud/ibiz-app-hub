import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartSeriesWriter } from './dechart-series-writer';

export class DEChartSeriesMapWriter extends DEChartSeriesWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartSeriesMap = src

    _.w(d, 'mapType', s);

    super.onFillDSL(c, s, d);
  }
}
