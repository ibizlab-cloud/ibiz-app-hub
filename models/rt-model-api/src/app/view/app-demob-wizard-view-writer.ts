import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEWizardViewWriter } from './app-dewizard-view-writer';

export class AppDEMobWizardViewWriter extends AppDEWizardViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobWizardView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
