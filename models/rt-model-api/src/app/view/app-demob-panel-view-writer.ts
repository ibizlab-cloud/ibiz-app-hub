import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEPanelViewWriter } from './app-depanel-view-writer';

export class AppDEMobPanelViewWriter extends AppDEPanelViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobPanelView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
