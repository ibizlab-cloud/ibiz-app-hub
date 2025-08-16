import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AjaxControlContainerWriter } from '../ajax-control-container-writer';

export class DEWizardPanelWriter extends AjaxControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEWizardPanel = src

    _.v(
      d,
      'finishControlAction',
      c.s('control.ControlAction[]', s, 'getFinishPSControlAction'),
    );
    _.v(
      d,
      'initControlAction',
      c.s('control.ControlAction[]', s, 'getInitPSControlAction'),
    );
    _.v(
      d,
      'deeditForms',
      c.m('control.form.DEEditForm[]', s, 'getPSDEEditForms'),
    );
    _.v(d, 'dewizard', c.s('dataentity.wizard.DEWizard[]', s, 'getPSDEWizard'));
    _.x(d, 'stateAppDEFieldId', s, 'getStatePSAppDEField');
    _.w(d, 'wizardStyle', s);
    _.w(d, 'showActionBar', s);
    _.w(d, 'showStepBar', s);

    super.onFillDSL(c, s, d);
  }
}
