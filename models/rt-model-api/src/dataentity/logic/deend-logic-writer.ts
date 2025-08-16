import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DEEndLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEEndLogic = src

    _.w(d, 'dstFieldName', s);
    _.w(d, 'rawValue', s);
    _.w(d, 'rawValueStdDataType', s, '', 0);
    _.x(d, 'returnParamId', s, 'getReturnParam');
    _.w(d, 'returnType', s);

    super.onFillDSL(c, s, d);
  }
}
