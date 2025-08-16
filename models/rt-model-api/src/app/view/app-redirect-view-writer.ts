import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppViewWriter } from './app-view-writer';

export class AppRedirectViewWriter extends AppViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppRedirectView = src

    _.v(
      d,
      'redirectAppViewRefs',
      c.m('app.view.AppViewRef[]', s, 'getRedirectPSAppViewRefs'),
    );

    super.onFillDSL(c, s, d);
  }
}
