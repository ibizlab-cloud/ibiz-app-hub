import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DETreeNodeRSParamWriter } from './detree-node-rsparam-writer';

export class DETreeNodeRSNavParamWriter extends DETreeNodeRSParamWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeNodeRSNavParam = src

    _.w(d, 'rawValue', s);

    super.onFillDSL(c, s, d);
  }
}
