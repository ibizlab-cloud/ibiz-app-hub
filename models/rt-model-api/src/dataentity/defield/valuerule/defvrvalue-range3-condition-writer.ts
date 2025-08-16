import { IModelDSLGenEngineContext } from '../../../imodel-dslgen-engine-context';
import { DEFVRSingleConditionWriter } from './defvrsingle-condition-writer';

export class DEFVRValueRange3ConditionWriter extends DEFVRSingleConditionWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFVRValueRange3Condition = src

    _.w(d, 'separator', s);
    _.w(d, 'valueRanges', s, 'valueRanges');

    super.onFillDSL(c, s, d);
  }
}
