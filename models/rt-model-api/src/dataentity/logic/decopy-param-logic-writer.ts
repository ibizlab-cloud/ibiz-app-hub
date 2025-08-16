import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DECopyParamLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDECopyParamLogic = src

    _.w(d, 'copyFields', s, 'copyFields');
    _.x(d, 'dstDELogicParamId', s, 'getDstPSDELogicParam');
    _.x(d, 'srcDELogicParamId', s, 'getSrcPSDELogicParam');
    _.w(d, 'copyIfNotExists', s);

    super.onFillDSL(c, s, d);
  }
}
