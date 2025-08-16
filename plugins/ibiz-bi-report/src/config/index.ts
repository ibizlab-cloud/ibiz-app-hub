import { RuntimeError } from '@ibiz-template/core';
import { IChartDefaultConfig } from '../interface';
import { NumberChartConfig, NumberDefaultData } from './number-chart-config';
import {
  GaugeChartModel,
  GaugeChartConfig,
  GaugeDefaultData,
} from './gauge-chart-config';
import {
  MultiSeriesColChartModel,
  MultiSeriesColChartConfig,
  MultiSeriesColDefaultData,
} from './multi-series-col-chart-config';
import {
  StackColChartModel,
  StackColChartConfig,
  StackColDefaultData,
} from './stack-col-chart-config';
import {
  ZoneColChartConfig,
  ZoneColChartModel,
  ZoneColDefaultData,
} from './zone-col-chart-config';
import {
  MultiSeriesBarChartConfig,
  MultiSeriesBarChartModel,
  MultiSeriesBarDefaultData,
} from './multi-series-bar-chart-config';
import {
  StackBarChartConfig,
  StackBarDefaultData,
  StackBarChartModel,
} from './stack-bar-chart-config';
import {
  MultiSeriesLineChartModel,
  MultiSeriesLineChartConfig,
  MultiSeriesLineDefaultData,
} from './multi-series-line-chart-config';
import {
  ZoneLineChartConfig,
  ZoneLineChartModel,
  ZoneLineDefaultData,
} from './zone-line-chart-config';
import {
  AreaChartConfig,
  AreaChartModel,
  AreaDefaultData,
} from './area-chart-config';
import { TableConfig, TableModel, TableDefaultData } from './table-config';
import {
  CrossTableConfig,
  CrossTableModel,
  CrossTableDefaultData,
} from './cross-table-config';
import {
  PieChartConfig,
  PieChartModel,
  PieDefaultData,
} from './pie-chart-config';
import {
  RadarChartConfig,
  RadarChartModel,
  RadarDefaultData,
} from './radar-chart-config';
import {
  ScatterChartConfig,
  ScatterChartModel,
  ScatterDefaultData,
} from './scatter-chart-config';

export { ChartTypes } from './chart-types';
export { NumberChartConfig, NumberDefaultData };
export { GaugeChartModel, GaugeChartConfig, GaugeDefaultData };
export {
  MultiSeriesColChartModel,
  MultiSeriesColChartConfig,
  MultiSeriesColDefaultData,
};
export { StackColChartModel, StackColChartConfig, StackColDefaultData };
export { ZoneColChartConfig, ZoneColChartModel, ZoneColDefaultData };
export {
  MultiSeriesBarChartConfig,
  MultiSeriesBarChartModel,
  MultiSeriesBarDefaultData,
};
export { StackBarChartConfig, StackBarDefaultData, StackBarChartModel };
export {
  MultiSeriesLineChartModel,
  MultiSeriesLineChartConfig,
  MultiSeriesLineDefaultData,
};
export { ZoneLineChartConfig, ZoneLineChartModel, ZoneLineDefaultData };
export { AreaChartConfig, AreaChartModel, AreaDefaultData };
export { TableConfig, TableModel, TableDefaultData };
export { CrossTableConfig, CrossTableModel, CrossTableDefaultData };
export { PieChartConfig, PieChartModel, PieDefaultData };
export { RadarChartConfig, RadarChartModel, RadarDefaultData };
export { ScatterChartConfig, ScatterChartModel, ScatterDefaultData };

export { extendData } from './extend-data';

export function getChartConfig(type: string): IChartDefaultConfig {
  switch (type) {
    case 'NUMBER':
      return {
        chartConfig: NumberChartConfig,
        chartDefaultValue: NumberDefaultData,
      };
    case 'GAUGE':
      return {
        chartConfig: GaugeChartConfig,
        chartModel: GaugeChartModel,
        chartDefaultValue: GaugeDefaultData,
      };
    case 'MULTI_SERIES_COL':
      return {
        chartConfig: MultiSeriesColChartConfig,
        chartModel: MultiSeriesColChartModel,
        chartDefaultValue: MultiSeriesColDefaultData,
      };
    case 'STACK_COL':
      return {
        chartConfig: StackColChartConfig,
        chartModel: StackColChartModel,
        chartDefaultValue: StackColDefaultData,
      };
    case 'ZONE_COL':
      return {
        chartConfig: ZoneColChartConfig,
        chartModel: ZoneColChartModel,
        chartDefaultValue: ZoneColDefaultData,
      };
    case 'MULTI_SERIES_BAR':
      return {
        chartConfig: MultiSeriesBarChartConfig,
        chartModel: MultiSeriesBarChartModel,
        chartDefaultValue: MultiSeriesBarDefaultData,
      };
    case 'STACK_BAR':
      return {
        chartConfig: StackBarChartConfig,
        chartModel: StackBarChartModel,
        chartDefaultValue: StackBarDefaultData,
      };
    case 'MULTI_SERIES_LINE':
      return {
        chartConfig: MultiSeriesLineChartConfig,
        chartModel: MultiSeriesLineChartModel,
        chartDefaultValue: MultiSeriesLineDefaultData,
      };
    case 'ZONE_LINE':
      return {
        chartConfig: ZoneLineChartConfig,
        chartModel: ZoneLineChartModel,
        chartDefaultValue: ZoneLineDefaultData,
      };
    case 'AREA':
      return {
        chartConfig: AreaChartConfig,
        chartModel: AreaChartModel,
        chartDefaultValue: AreaDefaultData,
      };
    case 'GRID':
      return {
        chartConfig: TableConfig,
        chartModel: TableModel,
        chartDefaultValue: TableDefaultData,
      };
    case 'CROSSTABLE':
      return {
        chartConfig: CrossTableConfig,
        chartModel: CrossTableModel,
        chartDefaultValue: CrossTableDefaultData,
      };
    case 'PIE':
      return {
        chartConfig: PieChartConfig,
        chartModel: PieChartModel,
        chartDefaultValue: PieDefaultData,
      };
    case 'RADAR':
      return {
        chartConfig: RadarChartConfig,
        chartModel: RadarChartModel,
        chartDefaultValue: RadarDefaultData,
      };
    case 'SCATTER':
      return {
        chartConfig: ScatterChartConfig,
        chartModel: ScatterChartModel,
        chartDefaultValue: ScatterDefaultData,
      };
    default:
      throw new RuntimeError(`传入类型${type}未识别`);
  }
}
