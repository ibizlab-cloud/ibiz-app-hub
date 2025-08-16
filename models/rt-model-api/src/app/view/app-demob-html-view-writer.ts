import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEHtmlViewWriter } from './app-dehtml-view-writer';

export class AppDEMobHtmlViewWriter extends AppDEHtmlViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobHtmlView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
