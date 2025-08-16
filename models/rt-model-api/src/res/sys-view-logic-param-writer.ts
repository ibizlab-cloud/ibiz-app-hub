import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class SysViewLogicParamWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysViewLogicParam = src

    _.w(d, 'paramValue', s);
    _.w(d, 'paramValue2', s);

    super.onFillDSL(c, s, d);
  }
}
