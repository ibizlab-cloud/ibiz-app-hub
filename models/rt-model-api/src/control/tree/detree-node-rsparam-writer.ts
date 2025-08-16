import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DETreeNodeRSParamWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeNodeRSParam = src

    _.w(d, 'desc', s);
    _.w(d, 'key', s);
    _.w(d, 'value', s);

    super.onFillDSL(c, s, d);
  }
}
