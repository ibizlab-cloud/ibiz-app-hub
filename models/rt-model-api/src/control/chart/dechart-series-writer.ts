import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ChartSeriesWriter } from './chart-series-writer';

export class DEChartSeriesWriter extends ChartSeriesWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartSeries = src

    _.w(d, 'baseOptionJOString', s);
    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.w(d, 'catalogField', s);
    _.x(d, 'catalogCodeListId', s, 'getCatalogPSCodeList');
    _.w(d, 'dataField', s);
    _.w(d, 'echartsType', s, 'eChartsType');
    _.w(d, 'extValue2Field', s);
    _.w(d, 'extValue3Field', s);
    _.w(d, 'extValue4Field', s);
    _.w(d, 'extValueField', s);
    _.w(d, 'groupMode', s);
    _.w(d, 'idField', s);
    _.x(d, 'chartCoordinateSystemId', s, 'getPSChartCoordinateSystem');
    _.x(d, 'chartDataSetId', s, 'getPSChartDataSet');
    _.v(
      d,
      'chartSeriesEncode',
      c.s('control.chart.ChartSeriesEncode[]', s, 'getPSChartSeriesEncode'),
    );
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'sampleData', s);
    _.w(d, 'seriesField', s);
    _.w(d, 'seriesLayoutBy', s);
    _.x(d, 'seriesCodeListId', s, 'getSeriesPSCodeList');
    _.w(d, 'seriesType', s);
    _.w(d, 'tagField', s);
    _.w(d, 'valueField', s);
    _.w(d, 'enableChartDataSet', s);

    super.onFillDSL(c, s, d);
  }
}
