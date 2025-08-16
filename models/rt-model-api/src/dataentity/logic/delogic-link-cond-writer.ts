import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DELogicLinkCondWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDELogicLinkCond = src

    _.w(d, 'logicType', s);

    super.onFillDSL(c, s, d);
  }
}
