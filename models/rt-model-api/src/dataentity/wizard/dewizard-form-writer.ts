import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEWizardFormWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEWizardForm = src

    _.v(
      d,
      'cm2LanguageRes',
      c.s('res.LanguageRes[]', s, 'getCM2PSLanguageRes'),
    );
    _.v(d, 'cmlanguageRes', c.s('res.LanguageRes[]', s, 'getCMPSLanguageRes'));
    _.w(d, 'confirmMsg', s);
    _.w(d, 'confirmMsg2', s);
    _.w(d, 'formTag', s);
    _.w(d, 'goFinishEnableScriptCode', s);
    _.w(d, 'goNextEnableScriptCode', s);
    _.w(d, 'goPrevEnableScriptCode', s);
    _.w(d, 'deformName', s, 'getPSDEFormName');
    _.x(d, 'dewizardStepId', s, 'getPSDEWizardStep');
    _.w(d, 'stepActions', s, 'stepActions');
    _.w(d, 'stepTag', s);
    _.w(d, 'firstForm', s);

    super.onFillDSL(c, s, d);
  }
}
