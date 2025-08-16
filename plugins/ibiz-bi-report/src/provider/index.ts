import { registerReportChartProvider } from './report-chart-register';
import { BIReportNumberProvider } from './bi-report-number-chart.provider';
import { BIReportPieChartProvider } from './bi-report-pie-chart.provider';
import { BiReportGaugeChartProvider } from './bi-report-gauge-chart.provider';
import { BIReportMultiSeriesBarChartProvider } from './bi-report-multi-series-bar-chart.ptovider';
import { BIReportMultiSeriesLineChartProvider } from './bi-report-multi-series-line-chart.ptovider';
import { BiReportMultiSeriesColChartProvider } from './bi-report-multi-series-col-chart.provider';
import { BIReportCrossTableProvider } from './bi-report-cross-table.provider';
import { BIReportScatterChartProvider } from './bi-report-scatter-chart.provider';
import { BIReportStackColChartProvider } from './bi-report-stackcol-chart.provider';
import { BIReportZoneColChartProvider } from './bi-report-zonecol-cahrt.provider';
import { BIReportStackBarChartProvider } from './bi-report-stackbar-chart.ptovider';
import { BIReportAreaChartProvider } from './bi-report-area-chart.provider';
import { BIReportZoneLineChartProvider } from './bi-report-zoneline-chart.provider';
import { BIReportRadarChartProvider } from './bi-report-radar-cahrt.provider';

import { BIReportTableProvider } from './bi-report-table.provider';

export * from './report-chart-register';

// 注册图表适配器
export const registerAllChartProvider = () => {
  registerReportChartProvider('NUMBER', () => new BIReportNumberProvider());
  registerReportChartProvider('PIE', () => new BIReportPieChartProvider());
  registerReportChartProvider(
    'SCATTER',
    () => new BIReportScatterChartProvider(),
  );
  registerReportChartProvider(
    'STACK_COL',
    () => new BIReportStackColChartProvider(),
  );
  registerReportChartProvider('GAUGE', () => new BiReportGaugeChartProvider());
  registerReportChartProvider(
    'MULTI_SERIES_BAR',
    () => new BIReportMultiSeriesBarChartProvider(),
  );
  registerReportChartProvider(
    'MULTI_SERIES_LINE',
    () => new BIReportMultiSeriesLineChartProvider(),
  );
  registerReportChartProvider(
    'MULTI_SERIES_COL',
    () => new BiReportMultiSeriesColChartProvider(),
  );
  registerReportChartProvider(
    'ZONE_COL',
    () => new BIReportZoneColChartProvider(),
  );
  registerReportChartProvider(
    'STACK_BAR',
    () => new BIReportStackBarChartProvider(),
  );
  registerReportChartProvider('AREA', () => new BIReportAreaChartProvider());
  registerReportChartProvider(
    'ZONE_LINE',
    () => new BIReportZoneLineChartProvider(),
  );
  registerReportChartProvider('RADAR', () => new BIReportRadarChartProvider());
  registerReportChartProvider(
    'CROSSTABLE',
    () => new BIReportCrossTableProvider(),
  );
  registerReportChartProvider('GRID', () => new BIReportTableProvider());
};
