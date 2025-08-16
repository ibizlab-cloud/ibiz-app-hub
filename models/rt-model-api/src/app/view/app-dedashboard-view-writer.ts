import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDESearchViewWriter } from './app-desearch-view-writer';

export class AppDEDashboardViewWriter extends AppDESearchViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEDashboardView = src

    _.w(d, 'markOpenDataMode', s);
    _.w(d, 'showDataInfoBar', s);

    super.onFillDSL(c, s, d);
  }
}
