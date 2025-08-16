import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class PanelItemListWriter extends ModelListWriterBase {
  onFillDSLList(c: IModelDSLGenEngineContext, src: any[], dst: any[]): void {
    const _ = this;
    src.forEach(item => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
    //super.onFillDSLList(context, src, dst)
  }

  onFillDSL(c: IModelDSLGenEngineContext, src: any, dst: any): void {
    switch (src['itemType']) {
      case 'BUTTON':
        c.fillDSL('control.panel.SysPanelButton', src, dst);
        return;
      case 'BUTTONLIST':
        c.fillDSL('control.panel.SysPanelButtonList', src, dst);
        return;
      case 'CONTAINER':
        c.fillDSL('control.panel.SysPanelContainer', src, dst);
        return;
      case 'CONTROL':
        c.fillDSL('control.panel.SysPanelControl', src, dst);
        return;
      case 'CTRLPOS':
        c.fillDSL('control.panel.SysPanelCtrlPos', src, dst);
        return;
      case 'FIELD':
        c.fillDSL('control.panel.SysPanelField', src, dst);
        return;
      case 'RAWITEM':
        c.fillDSL('control.panel.SysPanelRawItem', src, dst);
        return;
      case 'TABPANEL':
        c.fillDSL('control.panel.SysPanelTabPanel', src, dst);
        return;
      case 'TAGPAGE':
        c.fillDSL('control.panel.SysPanelTabPage', src, dst);
        return;
      case 'USERCONTROL':
        c.fillDSL('control.panel.SysPanelUserControl', src, dst);
        return;
    }

    //super.onFillDSL(context, src, dst)
  }
}
