import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFDLogicWriter } from './defdlogic-writer';

export class DEFDSingleLogicWriter extends DEFDLogicWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFDSingleLogic = src

    _.w(d, 'condOP', s);
    _.w(d, 'defdname', s, 'dEFDName');
    _.w(d, 'value', s);

    super.onFillDSL(c, s, d);
  }
}
