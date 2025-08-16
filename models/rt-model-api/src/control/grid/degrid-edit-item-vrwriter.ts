import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEGridEditItemVRWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEGridEditItemVR = src

    _.w(d, 'checkMode', s);
    _.v(
      d,
      'defvalueRule',
      c.s(
        'dataentity.defield.valuerule.DEFValueRule[]',
        s,
        'getPSDEFValueRule',
      ),
    );
    _.w(d, 'degridEditItemName', s, 'getPSDEGridEditItemName');
    _.v(
      d,
      'sysValueRule',
      c.s('valuerule.SysValueRule[]', s, 'getPSSysValueRule'),
    );
    _.w(d, 'valueRuleType', s);

    super.onFillDSL(c, s, d);
  }
}
