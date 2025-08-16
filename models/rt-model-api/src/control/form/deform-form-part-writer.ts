import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormBaseGroupPanelWriter } from './deform-base-group-panel-writer';

export class DEFormFormPartWriter extends DEFormBaseGroupPanelWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormFormPart = src

    _.w(d, 'formPartType', s);

    super.onFillDSL(c, s, d);
  }
}
