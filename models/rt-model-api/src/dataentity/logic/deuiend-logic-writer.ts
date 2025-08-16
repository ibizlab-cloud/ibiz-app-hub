import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUIEndLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUIEndLogic = src

    _.w(d, 'dstFieldName', s);
    _.w(d, 'rawValue', s);
    _.w(d, 'rawValueStdDataType', s, '', 0);
    _.x(d, 'returnParamId', s, 'getReturnParam');
    _.w(d, 'returnType', s);

    super.onFillDSL(c, s, d);
  }
}
