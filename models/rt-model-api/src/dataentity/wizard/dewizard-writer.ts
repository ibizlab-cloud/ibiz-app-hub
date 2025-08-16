import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEWizardWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEWizard = src

    _.w(d, 'codeName', s);
    _.w(d, 'finishCapLanResTag', s);
    _.v(
      d,
      'finishCapLanguageRes',
      c.s('res.LanguageRes[]', s, 'getFinishCapPSLanguageRes'),
    );
    _.w(d, 'finishCaption', s);
    _.x(d, 'firstDEWizardFormId', s, 'getFirstPSDEWizardForm');
    _.w(d, 'nextCapLanResTag', s);
    _.v(
      d,
      'nextCapLanguageRes',
      c.s('res.LanguageRes[]', s, 'getNextCapPSLanguageRes'),
    );
    _.w(d, 'nextCaption', s);
    _.v(
      d,
      'dewizardForms',
      c.m('dataentity.wizard.DEWizardForm[]', s, 'getPSDEWizardForms'),
    );
    _.v(
      d,
      'dewizardSteps',
      c.m('dataentity.wizard.DEWizardStep[]', s, 'getPSDEWizardSteps'),
    );
    _.w(d, 'prevCapLanResTag', s);
    _.v(
      d,
      'prevCapLanguageRes',
      c.s('res.LanguageRes[]', s, 'getPrevCapPSLanguageRes'),
    );
    _.w(d, 'prevCaption', s);
    _.w(d, 'wizardStyle', s);
    _.w(d, 'enableMainStateLogic', s);
    _.w(d, 'stateWizard', s);

    super.onFillDSL(c, s, d);
  }
}
