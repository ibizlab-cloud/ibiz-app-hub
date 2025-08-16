import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEWFProxyStartViewWriter } from './app-dewfproxy-start-view-writer';

export class AppDEMobWFProxyStartViewWriter extends AppDEWFProxyStartViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobWFProxyStartView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
