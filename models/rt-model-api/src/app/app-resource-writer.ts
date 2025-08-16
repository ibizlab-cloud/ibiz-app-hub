import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class AppResourceWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppResource = src

    _.w(d, 'content', s);
    _.w(d, 'resTag', s);
    _.w(d, 'resourceType', s);

    super.onFillDSL(c, s, d);
  }
}
