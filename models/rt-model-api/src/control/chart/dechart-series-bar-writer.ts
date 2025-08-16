import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartSeriesWriter2 } from './dechart-series-writer2';

export class DEChartSeriesBarWriter extends DEChartSeriesWriter2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartSeriesBar = src

    _.w(d, 'barCategoryGap', s);
    _.w(d, 'barGap', s);
    _.w(d, 'barMaxWidth', s);
    _.w(d, 'barMinHeight', s);
    _.w(d, 'barMinWidth', s);
    _.w(d, 'barWidth', s);
    _.w(d, 'stack', s);

    super.onFillDSL(c, s, d);
  }
}
