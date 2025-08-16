import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class ChartCoordinateSystemListWriter extends ModelListWriterBase {
  onFillDSLList(c: IModelDSLGenEngineContext, src: any[], dst: any[]): void {
    const _ = this;
    src.forEach(item => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
    //super.onFillDSLList(context, src, dst)
  }

  onFillDSL(c: IModelDSLGenEngineContext, src: any, dst: any): void {
    switch (src['type']) {
      case 'CALENDAR':
        c.fillDSL('control.chart.DEChartCoordinateSystemCalendar', src, dst);
        return;
      case 'MAP':
        c.fillDSL('control.chart.DEChartCoordinateSystemGeo', src, dst);
        return;
      case 'NONE':
        c.fillDSL('control.chart.DEChartCoordinateSystemNone', src, dst);
        return;
      case 'PARALLEL':
        c.fillDSL('control.chart.DEChartCoordinateSystemParallel', src, dst);
        return;
      case 'POLAR':
        c.fillDSL('control.chart.DEChartCoordinateSystemPolar', src, dst);
        return;
      case 'RADAR':
        c.fillDSL('control.chart.DEChartCoordinateSystemRadar', src, dst);
        return;
      case 'SINGLE':
        c.fillDSL('control.chart.DEChartCoordinateSystemSingle', src, dst);
        return;
      case 'XY':
        c.fillDSL('control.chart.DEChartCoordinateSystemCartesian2D', src, dst);
        return;
    }

    //super.onFillDSL(context, src, dst)
  }
}
