import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDECustomViewWriter } from './app-decustom-view-writer';

export class AppDEMobCustomViewWriter extends AppDECustomViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobCustomView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
