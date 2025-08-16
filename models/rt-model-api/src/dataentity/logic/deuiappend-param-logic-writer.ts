import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUIAppendParamLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUIAppendParamLogic = src

    _.w(d, 'dstIndex', s);
    _.w(d, 'srcFieldName', s);
    _.w(d, 'srcIndex', s);
    _.w(d, 'srcSize', s);

    super.onFillDSL(c, s, d);
  }
}
