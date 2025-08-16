import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlContainerWriter } from '../control-container-writer';

export class SysPanelWriter extends ControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysPanel = src

    _.w(d, 'dataMode', s, '', 0);
    _.w(d, 'dataName', s);
    _.w(d, 'dataTimer', s);
    _.v(
      d,
      'getControlAction',
      c.s('control.ControlAction[]', s, 'getGetPSControlAction'),
    );
    _.w(d, 'layoutMode', s);
    _.v(d, 'layout', c.s('control.layout.Layout[]', s, 'getPSLayout'));
    _.w(d, 'panelStyle', s);
    _.w(d, 'panelWidth', s, '', 0.0);
    _.v(
      d,
      'rootPanelItems',
      c.m('control.panel.PanelItem[]', s, 'getRootPSPanelItems'),
    );
    _.w(d, 'layoutPanel', s);
    _.w(d, 'mobilePanel', s);

    super.onFillDSL(c, s, d);
  }
}
