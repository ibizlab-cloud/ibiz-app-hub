import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartCoordinateSystemWriterBase } from './dechart-coordinate-system-writer-base';

export class DEChartCoordinateSystemGeoWriter extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartCoordinateSystemGeo = src

    _.v(d, 'chartGeo', c.s('control.chart.ChartGeo[]', s, 'getPSChartGeo'));

    super.onFillDSL(c, s, d);
  }
}
