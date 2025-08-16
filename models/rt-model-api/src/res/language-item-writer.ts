import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class LanguageItemWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSLanguageItem = src

    _.w(d, 'content', s);
    _.w(d, 'lanResTag', s);

    super.onFillDSL(c, s, d);
  }
}
