import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEFSearchModeWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFSearchMode = src

    _.w(d, 'codeName', s);
    _.w(d, 'itemTag', s);
    _.w(d, 'itemTag2', s);
    _.w(d, 'mode', s);
    _.w(d, 'stdDataType', s);
    _.w(d, 'valueFormat', s);
    _.w(d, 'valueFunc', s);
    _.w(d, 'valueOP', s);
    _.w(d, 'valueSeparator', s);
    _.w(d, 'default', s);

    super.onFillDSL(c, s, d);
  }
}
