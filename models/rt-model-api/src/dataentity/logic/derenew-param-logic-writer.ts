import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DERenewParamLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDERenewParamLogic = src

    _.x(d, 'dstDELogicParamId', s, 'getDstPSDELogicParam');

    super.onFillDSL(c, s, d);
  }
}
