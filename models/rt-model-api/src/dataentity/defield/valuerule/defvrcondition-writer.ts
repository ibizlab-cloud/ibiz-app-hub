import { IModelDSLGenEngineContext } from '../../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../../model-object-writer';

export class DEFVRConditionWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFVRCondition = src

    _.w(d, 'condTag', s);
    _.w(d, 'condTag2', s);
    _.w(d, 'condType', s);
    _.w(d, 'ruleInfo', s);
    _.w(d, 'ruleInfoLanResTag', s);
    _.v(
      d,
      'ruleInfoLanguageRes',
      c.s('res.LanguageRes[]', s, 'getRuleInfoPSLanguageRes'),
    );
    _.w(d, 'keyCond', s);
    _.w(d, 'notMode', s);

    super.onFillDSL(c, s, d);
  }
}
