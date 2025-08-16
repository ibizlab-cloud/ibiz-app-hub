import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DETreeGridExWriter } from './detree-grid-ex-writer';

export class DEGanttWriter extends DETreeGridExWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEGantt = src

    _.w(d, 'beginDataItemName', s);
    _.w(d, 'endDataItemName', s);
    _.w(d, 'finishDataItemName', s);
    _.w(d, 'prevDataItemName', s);
    _.w(d, 'sndataItemName', s, 'sNDataItemName');
    _.w(d, 'totalDataItemName', s);

    super.onFillDSL(c, s, d);
  }
}
