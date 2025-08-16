import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class ControlRenderWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSControlRender = src

    _.w(d, 'layoutPanelModel', s);
    _.v(
      d,
      'layoutPanel',
      c.s('control.panel.LayoutPanel[]', s, 'getPSLayoutPanel'),
    );
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'renderName', s);
    _.w(d, 'renderType', s);

    super.onFillDSL(c, s, d);
  }
}
