import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEDQConditionWriter } from './dedqcondition-writer';

export class DEDQGroupConditionWriter extends DEDQConditionWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDQGroupCondition = src

    _.w(d, 'condOp', s);
    _.v(
      d,
      'dedqconditions',
      c.m('dataentity.ds.DEDQCondition[]', s, 'getPSDEDQConditions'),
    );
    _.w(d, 'notMode', s);

    super.onFillDSL(c, s, d);
  }
}
