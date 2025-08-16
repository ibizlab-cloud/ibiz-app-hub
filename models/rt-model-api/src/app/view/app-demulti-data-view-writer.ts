import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEXDataViewWriter } from './app-dexdata-view-writer';

export class AppDEMultiDataViewWriter extends AppDEXDataViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMultiDataView = src

    _.w(d, 'expandSearchForm', s);
    _.w(d, 'pickupMode', s);

    super.onFillDSL(c, s, d);
  }
}
