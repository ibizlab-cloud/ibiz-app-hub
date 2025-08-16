import { ChartType, IBIReportChartController } from '../interface';
import { GaugeConverter } from './gauge-converter';
import { MultiSeriesBarConverter } from './multi-seriesbar-converter';
import { MultiSeriesLineConverter } from './multi-seriesline-converter';
import { MultiSeriesColConverter } from './multi-series-col-converter';
import { PieConverter } from './pie-converter';
import { ScatterConverter } from './scatter-converter';
import { StackColConverter } from './stackcol-converter';
import { ZoneColConverter } from './zonecol-converter';
import { StackBarConverter } from './stackbar-converter';
import { AreaConverter } from './area-converter';
import { ZoneLineConverter } from './zoneline-converter';
import { RadarConverter } from './radar-converter';
import { NumberConverter } from './number-converter';
import { CrossTableConverter } from './cross-table-converter';
import { TableConverter } from './table-converter';

export class ConverterFactory {
  static createConverter(
    chartType: ChartType,
    controller: IBIReportChartController,
  ) {
    if (chartType === 'PIE') {
      return new PieConverter(controller);
    }
    if (chartType === 'SCATTER') {
      return new ScatterConverter(controller);
    }
    if (chartType === 'STACK_COL') {
      return new StackColConverter(controller);
    }
    if (chartType === 'GAUGE') {
      return new GaugeConverter(controller);
    }
    if (chartType === 'MULTI_SERIES_LINE') {
      return new MultiSeriesLineConverter(controller);
    }
    if (chartType === 'MULTI_SERIES_BAR') {
      return new MultiSeriesBarConverter(controller);
    }
    if (chartType === 'MULTI_SERIES_COL') {
      return new MultiSeriesColConverter(controller);
    }
    if (chartType === 'ZONE_COL') {
      return new ZoneColConverter(controller);
    }
    if (chartType === 'STACK_BAR') {
      return new StackBarConverter(controller);
    }
    if (chartType === 'AREA') {
      return new AreaConverter(controller);
    }
    if (chartType === 'ZONE_LINE') {
      return new ZoneLineConverter(controller);
    }
    if (chartType === 'RADAR') {
      return new RadarConverter(controller);
    }
    if (chartType === 'NUMBER') {
      return new NumberConverter(controller);
    }
    if (chartType === 'CROSSTABLE') {
      return new CrossTableConverter(controller);
    }
    if (chartType === 'GRID') {
      return new TableConverter(controller);
    }
  }
}
