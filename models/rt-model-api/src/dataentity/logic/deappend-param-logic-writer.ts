import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DEAppendParamLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEAppendParamLogic = src

    _.w(d, 'dstIndex', s);
    _.x(d, 'dstDELogicParamId', s, 'getDstPSDELogicParam');
    _.w(d, 'srcFieldName', s);
    _.w(d, 'srcIndex', s);
    _.x(d, 'srcDELogicParamId', s, 'getSrcPSDELogicParam');
    _.w(d, 'srcSize', s);

    super.onFillDSL(c, s, d);
  }
}
