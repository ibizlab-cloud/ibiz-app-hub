import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppViewEngineParamWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppViewEngineParam = src

    _.w(d, 'appViewLogicName', s);
    _.w(d, 'ctrlName', s);
    _.w(d, 'paramType', s);
    _.w(d, 'value', s);

    super.onFillDSL(c, s, d);
  }
}
