import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEDataViewExplorerViewWriter } from './app-dedata-view-explorer-view-writer';

export class AppDEMobDataViewExplorerViewWriter extends AppDEDataViewExplorerViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobDataViewExplorerView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
