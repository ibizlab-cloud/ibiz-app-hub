import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEListExplorerViewWriter } from './app-delist-explorer-view-writer';

export class AppDEMobListExplorerViewWriter extends AppDEListExplorerViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobListExplorerView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
