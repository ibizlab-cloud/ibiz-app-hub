import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormDetailWriter } from './deform-detail-writer';

export class DEFormButtonWriter extends DEFormDetailWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormButton = src

    _.w(d, 'actionType', s);
    _.w(d, 'borderStyle', s);
    _.w(d, 'buttonStyle', s, '', 'DEFAULT');
    _.w(d, 'captionItemName', s);
    _.w(d, 'iconAlign', s);
    _.v(d, 'inlineUIAction', c.s('view.UIAction[]', s, 'getInlinePSUIAction'));
    _.x(d, 'deformItemUpdateId', s, 'getPSDEFormItemUpdate');
    _.v(
      d,
      'navigateContexts',
      c.m('control.NavigateContext[]', s, 'getPSNavigateContexts'),
    );
    _.v(
      d,
      'navigateParams',
      c.m('control.NavigateParam[]', s, 'getPSNavigateParams'),
    );
    _.x(d, 'uiactionId', s, 'getPSUIAction');
    _.x(d, 'paramPickupAppViewId', s, 'getParamPickupPSAppView');
    _.w(d, 'paramViewParamJO', s);
    _.w(d, 'tooltip', s);
    _.v(
      d,
      'tooltipLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTooltipPSLanguageRes'),
    );
    _.w(d, 'uiactionTarget', s, 'uIActionTarget');

    super.onFillDSL(c, s, d);
  }
}
