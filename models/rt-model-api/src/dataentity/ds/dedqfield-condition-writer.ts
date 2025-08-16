import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEDQConditionWriter } from './dedqcondition-writer';

export class DEDQFieldConditionWriter extends DEDQConditionWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDQFieldCondition = src

    _.w(d, 'condOp', s);
    _.w(d, 'condValue', s);
    _.w(d, 'fieldName', s);
    _.w(d, 'vartypeId', s, 'getPSVARTypeId');
    _.w(d, 'valueFunc', s);
    _.w(d, 'valueFuncTag', s);
    _.w(d, 'valueFuncTag2', s);
    _.w(d, 'ignoreEmpty', s);
    _.w(d, 'ignoreOthers', s);

    super.onFillDSL(c, s, d);
  }
}
