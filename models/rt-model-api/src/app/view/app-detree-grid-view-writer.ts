import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEMultiDataViewWriter } from './app-demulti-data-view-writer';

export class AppDETreeGridViewWriter extends AppDEMultiDataViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDETreeGridView = src

    _.w(d, 'gridRowActiveMode', s, '', 2);
    _.w(d, 'enableRowEdit', s);
    _.w(d, 'rowEditDefault', s);

    super.onFillDSL(c, s, d);
  }
}
