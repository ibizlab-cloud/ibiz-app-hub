import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEMultiDataViewWriter } from './app-demulti-data-view-writer';

export class AppDEMobListViewWriter extends AppDEMultiDataViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobListView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
