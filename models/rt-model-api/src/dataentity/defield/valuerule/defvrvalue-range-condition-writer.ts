import { IModelDSLGenEngineContext } from '../../../imodel-dslgen-engine-context';
import { DEFVRSingleConditionWriter } from './defvrsingle-condition-writer';

export class DEFVRValueRangeConditionWriter extends DEFVRSingleConditionWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFVRValueRangeCondition = src

    _.w(d, 'alwaysCheck', s);

    super.onFillDSL(c, s, d);
  }
}
