import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEGanttExplorerViewWriter } from './app-degantt-explorer-view-writer';

export class AppDEMobGanttExplorerViewWriter extends AppDEGanttExplorerViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobGanttExplorerView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
