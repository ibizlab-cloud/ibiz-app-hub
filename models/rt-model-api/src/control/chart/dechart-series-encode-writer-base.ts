import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartObjectWriterBase } from './dechart-object-writer-base';

export class DEChartSeriesEncodeWriterBase extends DEChartObjectWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartSeriesEncode = src

    _.w(d, 'itemId', s);
    _.w(d, 'itemName', s);
    _.w(d, 'type', s);

    super.onFillDSL(c, s, d);
  }
}
