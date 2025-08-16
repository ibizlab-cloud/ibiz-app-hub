import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class SysViewLogicWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysViewLogic = src

    _.w(d, 'codeName', s);
    _.w(d, 'logicType', s);
    _.w(d, 'viewLogicStyle', s);
    _.w(d, 'viewLogicType', s);

    super.onFillDSL(c, s, d);
  }
}
