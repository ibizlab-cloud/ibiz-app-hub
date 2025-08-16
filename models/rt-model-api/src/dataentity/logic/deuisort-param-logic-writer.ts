import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUISortParamLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUISortParamLogic = src

    _.w(d, 'dstFieldName', s);
    _.w(d, 'dstSortDir', s);

    super.onFillDSL(c, s, d);
  }
}
