import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEMapExplorerViewWriter } from './app-demap-explorer-view-writer';

export class AppDEMobMapExplorerViewWriter extends AppDEMapExplorerViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobMapExplorerView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
