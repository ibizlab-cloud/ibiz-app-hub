import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartCoordinateSystemWriterBase } from './dechart-coordinate-system-writer-base';

export class DEChartCoordinateSystemSingleWriter extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartCoordinateSystemSingle = src

    _.v(
      d,
      'chartSingle',
      c.s('control.chart.ChartSingle[]', s, 'getPSChartSingle'),
    );

    super.onFillDSL(c, s, d);
  }
}
