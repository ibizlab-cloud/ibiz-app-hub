import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ChartWriter } from './chart-writer';

export class DEChartWriter extends ChartWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChart = src

    _.w(d, 'baseOptionJOString', s);
    _.w(d, 'coordinateSystem', s);
    _.w(d, 'emptyText', s);
    _.v(
      d,
      'emptyTextLanguageRes',
      c.s('res.LanguageRes[]', s, 'getEmptyTextPSLanguageRes'),
    );
    _.w(d, 'minorSortDir', s);
    _.x(d, 'minorSortAppDEFieldId', s, 'getMinorSortPSAppDEField');
    _.v(
      d,
      'chartCoordinateSystems',
      c.m(
        'control.chart.ChartCoordinateSystem[]',
        s,
        'getPSChartCoordinateSystems',
      ),
    );
    _.v(
      d,
      'dechartDataGrid',
      c.s('control.chart.DEChartDataGrid[]', s, 'getPSDEChartDataGrid'),
    );
    _.v(
      d,
      'dechartLegend',
      c.s('control.chart.DEChartLegend[]', s, 'getPSDEChartLegend'),
    );
    _.v(
      d,
      'dechartSerieses',
      c.m('control.chart.DEChartSeries[]', s, 'getPSDEChartSerieses'),
    );
    _.v(
      d,
      'dechartTitle',
      c.s('control.chart.DEChartTitle[]', s, 'getPSDEChartTitle'),
    );

    super.onFillDSL(c, s, d);
  }
}
