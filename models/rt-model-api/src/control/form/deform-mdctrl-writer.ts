import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormBaseGroupPanelWriter } from './deform-base-group-panel-writer';

export class DEFormMDCtrlWriter extends DEFormBaseGroupPanelWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormMDCtrl = src

    _.w(d, 'actionGroupExtractMode', s);
    _.w(d, 'buildInActions', s, '', 0);
    _.v(
      d,
      'contentControl',
      c.s('control.Control[]', s, 'getContentPSControl'),
    );
    _.w(d, 'contentType', s);
    _.w(d, 'ctrlParams', s);
    _.w(d, 'fieldName', s);
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.x(d, 'deformItemUpdateId', s, 'getPSDEFormItemUpdate');
    _.v(
      d,
      'uiactionGroup',
      c.s('view.UIActionGroup[]', s, 'getPSUIActionGroup'),
    );
    _.w(d, 'resetItemNames', s, 'resetItemNames');
    _.w(d, 'titleBarCloseMode', s, '', 0);
    _.w(d, 'one2OneForm', s);

    super.onFillDSL(c, s, d);
  }
}
