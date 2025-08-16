import { IModelDSLGenEngineContext } from '../../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../../model-object-writer';

export class DEFValueRuleWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFValueRule = src

    _.w(d, 'codeName', s);
    _.v(
      d,
      'groupCond',
      c.s(
        'dataentity.defield.valuerule.DEFVRGroupCondition[]',
        s,
        'getPSDEFVRGroupCondition',
      ),
    );
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'ruleInfo', s);
    _.w(d, 'ruleInfoLanResTag', s);
    _.v(
      d,
      'ruleInfoLanguageRes',
      c.s('res.LanguageRes[]', s, 'getRuleInfoPSLanguageRes'),
    );
    _.w(d, 'ruleTag', s);
    _.w(d, 'ruleTag2', s);
    _.w(d, 'scriptCode', s);
    _.w(d, 'checkDefault', s);
    _.w(d, 'customCode', s);
    _.w(d, 'defaultMode', s);
    _.w(d, 'enableBackend', s);
    _.w(d, 'enableFront', s);

    super.onFillDSL(c, s, d);
  }
}
