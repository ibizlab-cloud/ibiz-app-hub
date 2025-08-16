import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEGridWriter } from './degrid-writer';

export class DEMultiEditViewPanelWriter extends DEGridWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEMultiEditViewPanel = src

    _.x(d, 'embeddedAppViewId', s, 'getEmbeddedPSAppView');
    _.w(d, 'panelStyle', s);

    super.onFillDSL(c, s, d);
  }
}
