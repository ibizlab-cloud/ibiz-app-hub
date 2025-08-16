import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class SysPanelModelWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysPanelModel = src

    _.w(d, 'codeName', s);
    _.w(d, 'dataType', s);
    _.w(d, 'type', s);
    _.w(d, 'ctrlModel', s);
    _.w(d, 'panelModel', s);
    _.w(d, 'viewModel', s);

    super.onFillDSL(c, s, d);
  }
}
