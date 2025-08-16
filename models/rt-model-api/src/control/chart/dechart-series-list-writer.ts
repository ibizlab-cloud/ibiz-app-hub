import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class DEChartSeriesListWriter extends ModelListWriterBase {
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
    switch (src['seriesType']) {
      case 'area':
      case 'line':
        c.fillDSL('control.chart.DEChartSeriesLine', src, dst);
        return;
      case 'bar':
      case 'bar3d':
      case 'column':
        c.fillDSL('control.chart.DEChartSeriesBar', src, dst);
        return;
      case 'candlestick':
        c.fillDSL('control.chart.DEChartSeriesCandlestick', src, dst);
        return;
      case 'custom':
        c.fillDSL('control.chart.DEChartSeriesCustom', src, dst);
        return;
      case 'funnel':
        c.fillDSL('control.chart.DEChartSeriesFunnel', src, dst);
        return;
      case 'gauge':
        c.fillDSL('control.chart.DEChartSeriesGauge', src, dst);
        return;
      case 'map':
        c.fillDSL('control.chart.DEChartSeriesMap', src, dst);
        return;
      case 'pie':
      case 'pie3d':
        c.fillDSL('control.chart.DEChartSeriesPie', src, dst);
        return;
      case 'radar':
        c.fillDSL('control.chart.DEChartSeriesRadar', src, dst);
        return;
      case 'scatter':
        c.fillDSL('control.chart.DEChartSeriesScatter', src, dst);
        return;
    }

    //super.onFillDSL(context, src, dst)
  }
}
