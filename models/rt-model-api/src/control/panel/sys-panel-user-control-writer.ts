import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysPanelItemWriter } from './sys-panel-item-writer';

export class SysPanelUserControlWriter extends SysPanelItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysPanelUserControl = src

    _.w(d, 'ctrlParams', s);
    _.w(d, 'predefinedType', s);

    super.onFillDSL(c, s, d);
  }
}
