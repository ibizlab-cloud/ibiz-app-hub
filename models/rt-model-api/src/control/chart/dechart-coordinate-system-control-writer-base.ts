import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartObjectWriterBase } from './dechart-object-writer-base';

export class DEChartCoordinateSystemControlWriterBase extends DEChartObjectWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartCoordinateSystemControl = src

    _.w(d, 'baseOptionJOString', s);
    _.x(d, 'chartCoordinateSystemId', s, 'getPSChartCoordinateSystem');
    _.w(d, 'type', s);

    super.onFillDSL(c, s, d);
  }
}
