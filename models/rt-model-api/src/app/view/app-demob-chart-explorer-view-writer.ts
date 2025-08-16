import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEChartExplorerViewWriter } from './app-dechart-explorer-view-writer';

export class AppDEMobChartExplorerViewWriter extends AppDEChartExplorerViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobChartExplorerView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
