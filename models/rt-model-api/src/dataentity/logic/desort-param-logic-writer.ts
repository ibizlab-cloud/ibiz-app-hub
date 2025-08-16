import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DESortParamLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDESortParamLogic = src

    _.w(d, 'dstFieldName', s);
    _.x(d, 'dstDELogicParamId', s, 'getDstPSDELogicParam');
    _.w(d, 'dstSortDir', s);

    super.onFillDSL(c, s, d);
  }
}
