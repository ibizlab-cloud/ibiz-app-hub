import { IModelDSLGenEngineContext } from '../../../imodel-dslgen-engine-context';
import { DEFVRSingleConditionWriter } from './defvrsingle-condition-writer';

export class DEFVRStringLengthConditionWriter extends DEFVRSingleConditionWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFVRStringLengthCondition = src

    _.w(d, 'maxValue', s);
    _.w(d, 'minValue', s);
    _.w(d, 'includeMaxValue', s);
    _.w(d, 'includeMinValue', s);

    super.onFillDSL(c, s, d);
  }
}
