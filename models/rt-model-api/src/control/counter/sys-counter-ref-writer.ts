import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class SysCounterRefWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysCounterRef = src

    _.w(d, 'refMode', s);
    _.w(d, 'tag', s);
    _.w(d, 'uniqueTag', s);

    super.onFillDSL(c, s, d);
  }
}
