import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class ControlAttributeWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSControlAttribute = src

    _.w(d, 'attrName', s);
    _.w(d, 'attrValue', s);

    super.onFillDSL(c, s, d);
  }
}
