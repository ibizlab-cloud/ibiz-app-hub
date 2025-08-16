import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFDGroupLogicWriter } from './defdgroup-logic-writer';

export class DEFDCatGroupLogicWriter extends DEFDGroupLogicWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFDCatGroupLogic = src

    _.w(d, 'logicCat', s);
    _.w(d, 'relatedDetailNames', s, 'relatedDetailNames');
    _.w(d, 'scriptCode', s);

    super.onFillDSL(c, s, d);
  }
}
