import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormWriter } from './deform-writer';

export class DEEditFormWriter extends DEFormWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEEditForm = src

    _.w(d, 'activeDataField', s);
    _.w(d, 'autoSaveMode', s, '', 0);
    _.v(
      d,
      'createControlAction',
      c.s('control.ControlAction[]', s, 'getCreatePSControlAction'),
    );
    _.v(
      d,
      'getDraftFromControlAction',
      c.s('control.ControlAction[]', s, 'getGetDraftFromPSControlAction'),
    );
    _.v(
      d,
      'getDraftControlAction',
      c.s('control.ControlAction[]', s, 'getGetDraftPSControlAction'),
    );
    _.v(
      d,
      'getControlAction',
      c.s('control.ControlAction[]', s, 'getGetPSControlAction'),
    );
    _.v(d, 'navBarSysCss', c.s('res.SysCss[]', s, 'getNavBarPSSysCss'));
    _.w(d, 'navBarPos', s);
    _.w(d, 'navBarStyle', s);
    _.w(d, 'navBarWidth', s, '', 0.0);
    _.w(d, 'navbarHeight', s, '', 0.0);
    _.x(d, 'appCounterRefId', s, 'getPSAppCounterRef');
    _.v(
      d,
      'controlNavContexts',
      c.m('control.ControlNavContext[]', s, 'getPSControlNavContexts'),
    );
    _.v(
      d,
      'controlNavParams',
      c.m('control.ControlNavParam[]', s, 'getPSControlNavParams'),
    );
    _.v(
      d,
      'removeControlAction',
      c.s('control.ControlAction[]', s, 'getRemovePSControlAction'),
    );
    _.v(
      d,
      'updateControlAction',
      c.s('control.ControlAction[]', s, 'getUpdatePSControlAction'),
    );
    _.w(d, 'activeDataMode', s);
    _.w(d, 'enableAutoSave', s);
    _.w(d, 'enableCustomized', s);
    _.w(d, 'infoFormMode', s);
    _.w(d, 'readOnly', s);
    _.w(d, 'showFormNavBar', s);

    //let iPSDEWizardEditForm = src

    _.v(
      d,
      'goBackControlAction',
      c.s('control.ControlAction[]', s, 'getGoBackPSControlAction'),
    );
    _.v(
      d,
      'dewizardForm',
      c.s('dataentity.wizard.DEWizardForm[]', s, 'getPSDEWizardForm'),
    );

    //let iPSWFEditForm = src

    _.v(
      d,
      'wfstartControlAction',
      c.s('control.ControlAction[]', s, 'getWFStartPSControlAction'),
    );
    _.v(
      d,
      'wfsubmitControlAction',
      c.s('control.ControlAction[]', s, 'getWFSubmitPSControlAction'),
    );

    super.onFillDSL(c, s, d);
  }
}
