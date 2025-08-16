import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUIThrowExceptionLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUIThrowExceptionLogic = src

    _.w(d, 'errorCode', s);
    _.w(d, 'errorInfo', s);
    _.w(d, 'exceptionObj', s);
    _.x(d, 'exceptionParamId', s, 'getExceptionParam');

    super.onFillDSL(c, s, d);
  }
}
