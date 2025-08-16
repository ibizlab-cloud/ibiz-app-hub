import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class NavigateParamWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSNavigateParam = src

    _.w(d, 'desc', s);
    _.w(d, 'key', s);
    _.w(d, 'value', s);
    _.w(d, 'rawValue', s);

    super.onFillDSL(c, s, d);
  }
}
