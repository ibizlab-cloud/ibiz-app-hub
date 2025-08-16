import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEPickupViewWriter } from './app-depickup-view-writer';

export class AppDEMobPickupViewWriter extends AppDEPickupViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobPickupView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
