import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEToolbarItemWriter } from './detoolbar-item-writer';

export class DETBSeperatorItemWriter extends DEToolbarItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETBSeperatorItem = src

    _.w(d, 'spanMode', s);

    super.onFillDSL(c, s, d);
  }
}
