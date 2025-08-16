import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlItemWriter2 } from '../control-item-writer2';

export class ChartSeriesWriter extends ControlItemWriter2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartObject = src

    _.w(d, 'index', s);

    super.onFillDSL(c, s, d);
  }
}
