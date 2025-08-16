import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEToolbarItemWriter } from './detoolbar-item-writer';

export class DETBRawItemWriter extends DEToolbarItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETBRawItem = src

    _.v(d, 'rawItem', c.s('control.RawItemBase[]', s, 'getPSRawItem'));

    super.onFillDSL(c, s, d);
  }
}
