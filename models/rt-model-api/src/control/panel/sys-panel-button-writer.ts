import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysPanelItemWriter } from './sys-panel-item-writer';

export class SysPanelButtonWriter extends SysPanelItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysPanelButton = src

    _.w(d, 'actionType', s);
    _.w(d, 'borderStyle', s);
    _.w(d, 'buttonCssStyle', s);
    _.w(d, 'buttonHeight', s, '', 0.0);
    _.w(d, 'buttonStyle', s);
    _.w(d, 'buttonType', s, '', 'PANELBUTTON');
    _.w(d, 'buttonWidth', s, '', 0.0);
    _.w(d, 'captionItemName', s);
    _.w(d, 'iconAlign', s);
    _.v(d, 'inlineUIAction', c.s('view.UIAction[]', s, 'getInlinePSUIAction'));
    _.x(d, 'uiactionId', s, 'getPSUIAction');
    _.w(d, 'renderMode', s, '', 'BUTTON');
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
