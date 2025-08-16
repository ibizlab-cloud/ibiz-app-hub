import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { MDAjaxControlContainerWriter2 } from '../mdajax-control-container-writer2';

export class ChartWriter extends MDAjaxControlContainerWriter2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChart = src

    _.v(
      d,
      'chartAngleAxises',
      c.m('control.chart.ChartAngleAxis[]', s, 'getPSChartAngleAxises'),
    );
    _.v(
      d,
      'chartDataSetGroups',
      c.m('control.chart.ChartDataSetGroup[]', s, 'getPSChartDataSetGroups'),
    );
    _.v(
      d,
      'chartDataSets',
      c.m('control.chart.ChartDataSet[]', s, 'getPSChartDataSets'),
    );
    _.v(
      d,
      'chartGrids',
      c.m('control.chart.ChartGrid[]', s, 'getPSChartGrids'),
    );
    _.v(
      d,
      'chartParallelAxises',
      c.m('control.chart.ChartParallelAxis[]', s, 'getPSChartParallelAxises'),
    );
    _.v(
      d,
      'chartParallels',
      c.m('control.chart.ChartParallel[]', s, 'getPSChartParallels'),
    );
    _.v(
      d,
      'chartPolars',
      c.m('control.chart.ChartPolar[]', s, 'getPSChartPolars'),
    );
    _.v(
      d,
      'chartRadars',
      c.m('control.chart.ChartRadar[]', s, 'getPSChartRadars'),
    );
    _.v(
      d,
      'chartRadiusAxises',
      c.m('control.chart.ChartRadiusAxis[]', s, 'getPSChartRadiusAxises'),
    );
    _.v(
      d,
      'chartSingleAxises',
      c.m('control.chart.ChartSingleAxis[]', s, 'getPSChartSingleAxises'),
    );
    _.v(
      d,
      'chartSingles',
      c.m('control.chart.ChartSingle[]', s, 'getPSChartSingles'),
    );
    _.v(
      d,
      'chartXAxises',
      c.m('control.chart.ChartXAxis[]', s, 'getPSChartXAxises'),
    );
    _.v(
      d,
      'chartYAxises',
      c.m('control.chart.ChartYAxis[]', s, 'getPSChartYAxises'),
    );

    super.onFillDSL(c, s, d);
  }
}
