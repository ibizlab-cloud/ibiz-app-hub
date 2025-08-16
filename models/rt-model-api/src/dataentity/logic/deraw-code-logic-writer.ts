import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DERawCodeLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDERawCodeLogic = src

    _.w(d, 'code', s);
    _.w(d, 'codeType', s);
    _.x(d, 'dstDELogicParamId', s, 'getDstPSDELogicParam');
    _.x(d, 'retDELogicParamId', s, 'getRetPSDELogicParam');

    super.onFillDSL(c, s, d);
  }
}
