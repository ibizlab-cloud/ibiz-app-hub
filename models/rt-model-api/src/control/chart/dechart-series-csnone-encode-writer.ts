import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartSeriesEncodeWriterBase } from './dechart-series-encode-writer-base';

export class DEChartSeriesCSNoneEncodeWriter extends DEChartSeriesEncodeWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartSeriesCSNoneEncode = src

    _.w(d, 'category', s);
    _.w(d, 'value', s);

    super.onFillDSL(c, s, d);
  }
}
