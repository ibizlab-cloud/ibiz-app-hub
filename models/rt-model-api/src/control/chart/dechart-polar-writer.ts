import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartCoordinateSystemControlWriterBase } from './dechart-coordinate-system-control-writer-base';

export class DEChartPolarWriter extends DEChartCoordinateSystemControlWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartPolar = src

    _.v(
      d,
      'chartPolarAngleAxis',
      c.s('control.chart.ChartPolarAngleAxis[]', s, 'getPSChartPolarAngleAxis'),
    );
    _.v(
      d,
      'chartPolarRadiusAxis',
      c.s(
        'control.chart.ChartPolarRadiusAxis[]',
        s,
        'getPSChartPolarRadiusAxis',
      ),
    );

    super.onFillDSL(c, s, d);
  }
}
