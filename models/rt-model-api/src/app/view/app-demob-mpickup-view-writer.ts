import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEMPickupViewWriter } from './app-dempickup-view-writer';

export class AppDEMobMPickupViewWriter extends AppDEMPickupViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobPickupView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
