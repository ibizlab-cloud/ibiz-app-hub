import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEActionParamWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEActionParam = src

    _.w(d, 'paramDesc', s);
    _.w(d, 'paramTag', s);
    _.w(d, 'paramTag2', s);
    _.w(d, 'stdDataType', s);
    _.w(d, 'value', s);
    _.w(d, 'valueType', s);
    _.w(d, 'allowEmpty', s, '', true);
    _.w(d, 'array', s);

    super.onFillDSL(c, s, d);
  }
}
