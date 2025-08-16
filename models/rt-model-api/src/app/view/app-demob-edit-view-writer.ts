import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEEditViewWriter } from './app-deedit-view-writer';

export class AppDEMobEditViewWriter extends AppDEEditViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobEditView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
