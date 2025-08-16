import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysPanelContainerWriterBase } from './sys-panel-container-writer-base';

export class SysPanelTabPageWriter extends SysPanelContainerWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysPanelTabPage = src

    _.w(d, 'captionItemName', s);
    _.v(
      d,
      'panelItems',
      c.m('control.panel.PanelItem[]', s, 'getPSPanelItems'),
    );
    _.w(d, 'predefinedType', s);
    _.w(d, 'titleBarCloseMode', s, '', 0);

    super.onFillDSL(c, s, d);
  }
}
