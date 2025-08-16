import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppValueRuleWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppValueRule = src

    _.w(d, 'codeName', s);
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'regExCode', s);
    _.w(d, 'regExCode2', s);
    _.w(d, 'regExCode3', s);
    _.w(d, 'regExCode4', s);
    _.w(d, 'ruleInfo', s);
    _.w(d, 'ruleInfoLanResTag', s);
    _.v(
      d,
      'ruleInfoLanguageRes',
      c.s('res.LanguageRes[]', s, 'getRuleInfoPSLanguageRes'),
    );
    _.w(d, 'ruleTag', s);
    _.w(d, 'ruleTag2', s);
    _.w(d, 'ruleType', s);
    _.w(d, 'scriptCode', s);
    _.w(d, 'uniqueTag', s);
    _.w(d, 'enableFront', s);

    super.onFillDSL(c, s, d);
  }
}
