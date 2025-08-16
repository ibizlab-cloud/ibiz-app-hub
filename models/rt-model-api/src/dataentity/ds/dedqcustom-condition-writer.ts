import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEDQConditionWriter } from './dedqcondition-writer';

export class DEDQCustomConditionWriter extends DEDQConditionWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDQCustomCondition = src

    _.w(d, 'condition', s);
    _.w(d, 'customType', s);

    super.onFillDSL(c, s, d);
  }
}
