import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DataItemWriter } from '../../data/data-item-writer';

export class DEACModeDataItemWriter extends DataItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEACModeDataItem = src

    _.w(d, 'format', s);
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.w(d, 'scriptCode', s);
    _.w(d, 'customCode', s);

    super.onFillDSL(c, s, d);
  }
}
