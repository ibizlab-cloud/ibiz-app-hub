import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ListDataItemWriter } from './list-data-item-writer';

export class DEListDataItemWriter extends ListDataItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEListDataItem = src

    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');

    super.onFillDSL(c, s, d);
  }
}
