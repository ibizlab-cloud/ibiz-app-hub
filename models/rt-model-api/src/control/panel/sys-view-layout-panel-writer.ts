import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysPanelWriter } from './sys-panel-writer';

export class SysViewLayoutPanelWriter extends SysPanelWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysViewLayoutPanel = src

    _.w(d, 'layoutBodyOnly', s);
    _.w(d, 'useDefaultLayout', s);
    _.w(d, 'viewProxyMode', s);

    super.onFillDSL(c, s, d);
  }
}
