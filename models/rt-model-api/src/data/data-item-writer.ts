import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class DataItemWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDataItem = src

    _.w(d, 'dataType', s);
    _.w(d, 'format', s);
    _.x(d, 'codeListId', s, 'getPSCodeList');
    _.w(d, 'convertToCodeItemText', s);

    super.onFillDSL(c, s, d);
  }
}
