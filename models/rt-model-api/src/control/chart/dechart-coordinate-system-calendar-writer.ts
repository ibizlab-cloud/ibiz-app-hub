import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartCoordinateSystemWriterBase } from './dechart-coordinate-system-writer-base';

export class DEChartCoordinateSystemCalendarWriter extends DEChartCoordinateSystemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartCoordinateSystemCalendar = src

    _.v(
      d,
      'chartCalendar',
      c.s('control.chart.ChartCalendar[]', s, 'getPSChartCalendar'),
    );

    super.onFillDSL(c, s, d);
  }
}
