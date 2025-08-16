import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { PanelItemLogicWriter } from './panel-item-logic-writer';

export class PanelItemSingleLogicWriter extends PanelItemLogicWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSPanelItemSingleLogic = src

    _.w(d, 'condOp', s);
    _.w(d, 'dstModelField', s);
    _.w(d, 'value', s);

    super.onFillDSL(c, s, d);
  }
}
