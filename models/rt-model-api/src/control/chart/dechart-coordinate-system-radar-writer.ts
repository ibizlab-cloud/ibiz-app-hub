import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartCoordinateSystemWriterBase } from './dechart-coordinate-system-writer-base';

export class DEChartCoordinateSystemRadarWriter extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartCoordinateSystemRadar = src

    _.v(
      d,
      'chartRadar',
      c.s('control.chart.ChartRadar[]', s, 'getPSChartRadar'),
    );

    super.onFillDSL(c, s, d);
  }
}
