import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartSeriesEncodeWriterBase } from './dechart-series-encode-writer-base';

export class DEChartSeriesCSCartesian2DEncodeWriter extends DEChartSeriesEncodeWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartSeriesCSCartesian2DEncode = src

    _.x(d, 'chartXAxisId', s, 'getPSChartXAxis');
    _.x(d, 'chartYAxisId', s, 'getPSChartYAxis');
    _.w(d, 'x', s, 'x');
    _.w(d, 'y', s, 'y');

    super.onFillDSL(c, s, d);
  }
}
