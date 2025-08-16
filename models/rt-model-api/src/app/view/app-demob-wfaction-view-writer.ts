import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEWFActionViewWriter } from './app-dewfaction-view-writer';

export class AppDEMobWFActionViewWriter extends AppDEWFActionViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobWFActionView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
