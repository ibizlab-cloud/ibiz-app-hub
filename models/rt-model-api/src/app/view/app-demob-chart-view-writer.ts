import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEChartViewWriter } from './app-dechart-view-writer';

export class AppDEMobChartViewWriter extends AppDEChartViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobChartView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
