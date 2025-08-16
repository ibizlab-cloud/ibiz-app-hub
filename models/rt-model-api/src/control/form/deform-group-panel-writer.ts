import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormBaseGroupPanelWriter } from './deform-base-group-panel-writer';

export class DEFormGroupPanelWriter extends DEFormBaseGroupPanelWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormGroupPanel = src

    _.w(d, 'actionGroupExtractMode', s);
    _.w(d, 'buildInActions', s, '', 0);
    _.v(
      d,
      'uiactionGroup',
      c.s('view.UIActionGroup[]', s, 'getPSUIActionGroup'),
    );
    _.w(d, 'titleBarCloseMode', s, '', 0);

    super.onFillDSL(c, s, d);
  }
}
