import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUIRawCodeLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUIRawCodeLogic = src

    _.w(d, 'code', s);

    super.onFillDSL(c, s, d);
  }
}
