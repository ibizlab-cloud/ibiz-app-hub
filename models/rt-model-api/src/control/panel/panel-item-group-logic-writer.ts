import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { PanelItemLogicWriter } from './panel-item-logic-writer';

export class PanelItemGroupLogicWriter extends PanelItemLogicWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSPanelItemGroupLogic = src

    _.w(d, 'groupOP', s);
    _.v(
      d,
      'panelItemLogics',
      c.m('control.panel.PanelItemLogic[]', s, 'getPSPanelItemLogics'),
    );
    _.w(d, 'notMode', s);

    super.onFillDSL(c, s, d);
  }
}
