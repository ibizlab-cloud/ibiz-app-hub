import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartSeriesWriter2 } from './dechart-series-writer2';

export class DEChartSeriesLineWriter extends DEChartSeriesWriter2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartSeriesLine = src

    _.w(d, 'step', s);
    _.w(d, 'stack', s);

    super.onFillDSL(c, s, d);
  }
}
