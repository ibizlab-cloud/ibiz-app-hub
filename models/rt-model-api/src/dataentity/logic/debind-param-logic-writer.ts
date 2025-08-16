import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DEBindParamLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEBindParamLogic = src

    _.x(d, 'dstDELogicParamId', s, 'getDstPSDELogicParam');
    _.w(d, 'srcFieldName', s);
    _.x(d, 'srcDELogicParamId', s, 'getSrcPSDELogicParam');

    super.onFillDSL(c, s, d);
  }
}
