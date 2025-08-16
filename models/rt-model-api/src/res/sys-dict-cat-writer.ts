import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class SysDictCatWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysDictCat = src

    _.w(d, 'codeName', s);
    _.w(d, 'dictCatTag', s);
    _.w(d, 'dictCatTag2', s);
    _.w(d, 'userDictCat', s);

    super.onFillDSL(c, s, d);
  }
}
