import { IModelDSLGenEngineContext } from '../../../imodel-dslgen-engine-context';
import { DEFVRSingleConditionWriter } from './defvrsingle-condition-writer';

export class DEFVRSysValueRuleConditionWriter extends DEFVRSingleConditionWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFVRSysValueRuleCondition = src

    _.v(
      d,
      'sysValueRule',
      c.s('valuerule.SysValueRule[]', s, 'getPSSysValueRule'),
    );

    super.onFillDSL(c, s, d);
  }
}
