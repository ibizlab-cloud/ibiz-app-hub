import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class MobAppStartPageWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSMobAppStartPage = src

    _.w(d, 'height', s);
    _.w(d, 'width', s);

    super.onFillDSL(c, s, d);
  }
}
