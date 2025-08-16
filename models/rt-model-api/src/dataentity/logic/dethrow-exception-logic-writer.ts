import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DEThrowExceptionLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEThrowExceptionLogic = src

    _.w(d, 'errorCode', s);
    _.w(d, 'errorInfo', s);
    _.w(d, 'exceptionObj', s);
    _.x(d, 'exceptionParamId', s, 'getExceptionParam');

    super.onFillDSL(c, s, d);
  }
}
