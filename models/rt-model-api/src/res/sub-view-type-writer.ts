import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class SubViewTypeWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSubViewType = src

    _.w(d, 'codeName', s);
    _.w(d, 'nameMode', s);
    _.w(d, 'typeCode', s);
    _.w(d, 'viewModel', s);
    _.w(d, 'viewType', s);
    _.w(d, 'extendStyleOnly', s);
    _.w(d, 'replaceDefault', s);

    super.onFillDSL(c, s, d);
  }
}
