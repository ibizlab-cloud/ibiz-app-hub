import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlContainerWriter } from '../control-container-writer';

export class TabExpPanelWriter extends ControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSTabExpPanel = src

    _.y(d, 'tabExpPageIds', s, 'getPSTabExpPages');
    _.w(d, 'tabLayout', s);
    _.w(d, 'uniqueTag', s);

    super.onFillDSL(c, s, d);
  }
}
