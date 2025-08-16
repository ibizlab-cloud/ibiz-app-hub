import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormBaseGroupPanelWriter } from './deform-base-group-panel-writer';

export class DEFormPageWriter extends DEFormBaseGroupPanelWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormPage = src

    super.onFillDSL(c, s, d);
  }
}
