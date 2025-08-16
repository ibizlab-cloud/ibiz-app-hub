import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AjaxControlContainerWriter } from '../ajax-control-container-writer';

export class DEFormWriter extends AjaxControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEForm = src

    _.w(d, 'formFuncMode', s);
    _.w(d, 'formStyle', s);
    _.w(d, 'formWidth', s, '', 0.0);
    _.x(d, 'appDEFInputTipSetId', s, 'getPSAppDEFInputTipSet');
    _.v(
      d,
      'deformItemUpdates',
      c.m('control.form.DEFormItemUpdate[]', s, 'getPSDEFormItemUpdates'),
    );
    _.v(
      d,
      'deformItemVRs',
      c.m('control.form.DEFormItemVR[]', s, 'getPSDEFormItemVRs'),
    );
    _.v(
      d,
      'deformPages',
      c.m('control.form.DEFormPage[]', s, 'getPSDEFormPages'),
    );
    _.v(d, 'layout', c.s('control.layout.Layout[]', s, 'getPSLayout'));
    _.w(d, 'tabHeaderPos', s);
    _.w(d, 'enableItemFilter', s);
    _.w(d, 'mobileControl', s);
    _.w(d, 'noTabHeader', s);

    super.onFillDSL(c, s, d);
  }
}
