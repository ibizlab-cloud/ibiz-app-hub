import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEActionLogicWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEActionLogic = src

    _.w(d, 'actionLogicType', s);
    _.w(d, 'attachMode', s);
    _.w(d, 'dataSyncEvent', s, '', 0);
    _.w(d, 'scriptCode', s);
    _.w(d, 'cloneParam', s);
    _.w(d, 'enableBackend', s, '', true);
    _.w(d, 'ignoreException', s);
    _.w(d, 'internalLogic', s);
    _.w(d, 'valid', s, '', true);

    super.onFillDSL(c, s, d);
  }
}
