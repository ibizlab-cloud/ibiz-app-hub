import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEMEditViewWriter } from './app-demedit-view-writer';

export class AppDEMobMEditViewWriter extends AppDEMEditViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobMEditView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
