import { IModelDSLGenEngineContext } from '../../../imodel-dslgen-engine-context';
import { DEFVRConditionWriter } from './defvrcondition-writer';

export class DEFVRGroupConditionWriter extends DEFVRConditionWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFVRGroupCondition = src

    _.w(d, 'condOp', s);
    _.v(
      d,
      'conds',
      c.m(
        'dataentity.defield.valuerule.DEFVRCondition[]',
        s,
        'getPSDEFVRConditions',
      ),
    );

    super.onFillDSL(c, s, d);
  }
}
