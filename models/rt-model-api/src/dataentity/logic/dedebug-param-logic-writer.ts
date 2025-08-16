import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DEDebugParamLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDebugParamLogic = src

    _.x(d, 'dstDELogicParamId', s, 'getDstPSDELogicParam');

    super.onFillDSL(c, s, d);
  }
}
