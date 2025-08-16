import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DataItemWriter } from '../../data/data-item-writer';

export class ListDataItemWriter extends DataItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSListDataItem = src

    _.x(d, 'frontCodeListId', s, 'getFrontPSCodeList');
    _.w(d, 'groupItem', s);
    _.w(d, 'scriptCode', s);
    _.w(d, 'customCode', s);

    super.onFillDSL(c, s, d);
  }
}
