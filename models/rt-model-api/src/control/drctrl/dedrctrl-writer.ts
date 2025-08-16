import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AjaxControlContainerWriter } from '../ajax-control-container-writer';

export class DEDRCtrlWriter extends AjaxControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDRCtrl = src

    _.w(d, 'dataRelationTag', s);
    _.v(
      d,
      'editItemCapLanguageRes',
      c.s('res.LanguageRes[]', s, 'getEditItemCapPSLanguageRes'),
    );
    _.w(d, 'editItemCaption', s);
    _.v(
      d,
      'editItemSysImage',
      c.s('res.SysImage[]', s, 'getEditItemPSSysImage'),
    );
    _.x(d, 'formAppViewId', s, 'getFormPSAppView');
    _.x(d, 'appCounterRefId', s, 'getPSAppCounterRef');
    _.v(
      d,
      'dedrctrlItems',
      c.m('control.drctrl.DEDRCtrlItem[]', s, 'getPSDEDRCtrlItems'),
    );
    _.w(d, 'uniqueTag', s);
    _.w(d, 'enableCustomized', s);
    _.w(d, 'hideEditItem', s);

    super.onFillDSL(c, s, d);
  }
}
