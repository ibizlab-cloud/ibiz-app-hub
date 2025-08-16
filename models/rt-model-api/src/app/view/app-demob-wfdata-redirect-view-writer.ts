import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEWFDataRedirectViewWriter } from './app-dewfdata-redirect-view-writer';

export class AppDEMobWFDataRedirectViewWriter extends AppDEWFDataRedirectViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobWFDataRedirectView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
