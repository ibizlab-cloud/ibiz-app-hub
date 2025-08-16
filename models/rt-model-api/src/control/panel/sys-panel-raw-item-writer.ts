import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysPanelItemWriter } from './sys-panel-item-writer';

export class SysPanelRawItemWriter extends SysPanelItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSRawItemContainer = src

    _.v(d, 'rawItem', c.s('control.RawItemBase[]', s, 'getPSRawItem'));

    super.onFillDSL(c, s, d);
  }
}
