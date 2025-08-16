import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEMultiDataViewWriter } from './app-demulti-data-view-writer';

export class AppDEGridViewWriter extends AppDEMultiDataViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEGridView = src

    _.w(d, 'gridRowActiveMode', s);
    _.w(d, 'enableRowEdit', s);
    _.w(d, 'rowEditDefault', s);

    super.onFillDSL(c, s, d);
  }
}
