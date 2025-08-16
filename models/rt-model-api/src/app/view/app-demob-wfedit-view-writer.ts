import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEWFEditViewWriter } from './app-dewfedit-view-writer';

export class AppDEMobWFEditViewWriter extends AppDEWFEditViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobWFEditView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
