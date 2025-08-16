import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEViewWriter } from './app-deview-writer';

export class AppDERedirectViewWriter extends AppDEViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDERedirectView = src

    _.x(d, 'getDataAppDEActionId', s, 'getGetDataPSAppDEAction');
    _.v(
      d,
      'redirectAppViewRefs',
      c.m('app.view.AppViewRef[]', s, 'getRedirectPSAppViewRefs'),
    );
    _.x(d, 'typeAppDEFieldId', s, 'getTypePSAppDEField');
    _.w(d, 'enableCustomGetDataAction', s);
    _.w(d, 'enableWorkflow', s);

    super.onFillDSL(c, s, d);
  }
}
