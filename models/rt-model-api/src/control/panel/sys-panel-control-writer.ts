import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysPanelItemWriter } from './sys-panel-item-writer';

export class SysPanelControlWriter extends SysPanelItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysPanelControl = src

    _.v(d, 'control', c.s('control.Control[]', s, 'getPSControl'));
    _.w(d, 'viewFieldName', s);

    super.onFillDSL(c, s, d);
  }
}
