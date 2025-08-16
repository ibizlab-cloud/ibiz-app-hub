import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEWFProxyResultViewWriter } from './app-dewfproxy-result-view-writer';

export class AppDEMobWFProxyResultViewWriter extends AppDEWFProxyResultViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobWFProxyResultView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
