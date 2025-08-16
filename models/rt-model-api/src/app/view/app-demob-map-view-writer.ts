import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEMapViewWriter } from './app-demap-view-writer';

export class AppDEMobMapViewWriter extends AppDEMapViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobMapView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
