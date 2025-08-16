import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartObjectWriterBase } from './dechart-object-writer-base';

export class DEChartLegendWriter extends DEChartObjectWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartLegend = src

    _.w(d, 'legendPos', s);
    _.w(d, 'showLegend', s);

    super.onFillDSL(c, s, d);
  }
}
