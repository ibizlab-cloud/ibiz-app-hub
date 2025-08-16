import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEDQConditionWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDQCondition = src

    _.w(d, 'condTag', s);
    _.w(d, 'condTag2', s);
    _.w(d, 'condType', s);

    super.onFillDSL(c, s, d);
  }
}
