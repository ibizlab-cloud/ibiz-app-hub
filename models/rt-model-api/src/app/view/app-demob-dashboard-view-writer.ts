import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEDashboardViewWriter } from './app-dedashboard-view-writer';

export class AppDEMobDashboardViewWriter extends AppDEDashboardViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobDashboardView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
