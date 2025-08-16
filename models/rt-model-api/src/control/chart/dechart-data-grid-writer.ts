import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartObjectWriterBase } from './dechart-object-writer-base';

export class DEChartDataGridWriter extends DEChartObjectWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartDataGrid = src

    _.w(d, 'dataGridPos', s);
    _.w(d, 'showDataGrid', s);

    super.onFillDSL(c, s, d);
  }
}
