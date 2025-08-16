import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { PanelItemGroupLogicWriter } from './panel-item-group-logic-writer';

export class PanelItemCatGroupLogicWriter extends PanelItemGroupLogicWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSPanelItemCatGroupLogic = src

    _.w(d, 'logicCat', s);
    _.w(d, 'relatedItemNames', s, 'relatedItemNames');

    super.onFillDSL(c, s, d);
  }
}
