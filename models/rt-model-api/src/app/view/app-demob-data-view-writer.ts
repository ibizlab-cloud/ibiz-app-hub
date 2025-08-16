import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEDataViewWriter } from './app-dedata-view-writer';

export class AppDEMobDataViewWriter extends AppDEDataViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobDataView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
