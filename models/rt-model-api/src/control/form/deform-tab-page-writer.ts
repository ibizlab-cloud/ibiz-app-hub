import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormBaseGroupPanelWriter } from './deform-base-group-panel-writer';

export class DEFormTabPageWriter extends DEFormBaseGroupPanelWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormTabPage = src

    super.onFillDSL(c, s, d);
  }
}
