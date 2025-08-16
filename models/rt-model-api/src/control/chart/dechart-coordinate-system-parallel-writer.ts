import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartCoordinateSystemWriterBase } from './dechart-coordinate-system-writer-base';

export class DEChartCoordinateSystemParallelWriter extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartCoordinateSystemParallel = src

    _.v(
      d,
      'chartParallel',
      c.s('control.chart.ChartParallel[]', s, 'getPSChartParallel'),
    );

    super.onFillDSL(c, s, d);
  }
}
