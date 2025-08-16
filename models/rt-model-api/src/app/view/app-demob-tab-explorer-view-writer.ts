import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDETabExplorerViewWriter } from './app-detab-explorer-view-writer';

export class AppDEMobTabExplorerViewWriter extends AppDETabExplorerViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobTabExplorerView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
