import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartCoordinateSystemWriterBase } from './dechart-coordinate-system-writer-base';

export class DEChartCoordinateSystemCartesian2DWriter extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartCoordinateSystemCartesian2D = src

    _.v(d, 'chartGrid', c.s('control.chart.ChartGrid[]', s, 'getPSChartGrid'));

    super.onFillDSL(c, s, d);
  }
}
