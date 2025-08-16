import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DataItemWriter } from '../../data/data-item-writer';

export class DEDataViewDataItemWriter extends DataItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDataViewDataItem = src

    _.x(d, 'frontCodeListId', s, 'getFrontPSCodeList');
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.w(d, 'scriptCode', s);
    _.w(d, 'customCode', s);

    super.onFillDSL(c, s, d);
  }
}
