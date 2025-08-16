import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppViewWriter } from './app-view-writer';

export class AppPortalViewWriter extends AppViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppPortalView = src

    super.onFillDSL(c, s, d);
  }
}
