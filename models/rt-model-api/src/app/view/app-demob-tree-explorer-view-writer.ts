import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDETreeExplorerViewWriter } from './app-detree-explorer-view-writer';

export class AppDEMobTreeExplorerViewWriter extends AppDETreeExplorerViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobTreeExplorerView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
