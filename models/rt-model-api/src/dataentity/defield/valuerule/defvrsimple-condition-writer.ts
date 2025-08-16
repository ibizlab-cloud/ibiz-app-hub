import { IModelDSLGenEngineContext } from '../../../imodel-dslgen-engine-context';
import { DEFVRSingleConditionWriter } from './defvrsingle-condition-writer';

export class DEFVRSimpleConditionWriter extends DEFVRSingleConditionWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFVRSimpleCondition = src

    _.w(d, 'condOp', s);
    _.w(d, 'paramType', s);
    _.w(d, 'paramValue', s);

    super.onFillDSL(c, s, d);
  }
}
