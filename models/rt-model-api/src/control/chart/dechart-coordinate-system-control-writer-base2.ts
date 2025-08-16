import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartCoordinateSystemControlWriterBase } from './dechart-coordinate-system-control-writer-base';

export class DEChartCoordinateSystemControlWriterBase2 extends DEChartCoordinateSystemControlWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartPosition = src

    _.w(d, 'bottom', s);
    _.w(d, 'height', s);
    _.w(d, 'left', s);
    _.w(d, 'right', s);
    _.w(d, 'top', s);
    _.w(d, 'width', s);

    super.onFillDSL(c, s, d);
  }
}
