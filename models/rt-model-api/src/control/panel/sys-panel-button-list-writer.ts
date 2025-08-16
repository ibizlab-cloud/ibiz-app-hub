import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysPanelItemWriter } from './sys-panel-item-writer';

export class SysPanelButtonListWriter extends SysPanelItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysPanelButtonList = src

    _.w(d, 'actionGroupExtractMode', s, '', 'ITEM');
    _.w(d, 'buttonListType', s, '', 'UIACTIONGROUP');
    _.v(
      d,
      'panelButtons',
      c.m('control.panel.PanelButton[]', s, 'getPSPanelButtons'),
    );
    _.v(
      d,
      'uiactionGroup',
      c.s('view.UIActionGroup[]', s, 'getPSUIActionGroup'),
    );

    super.onFillDSL(c, s, d);
  }
}
