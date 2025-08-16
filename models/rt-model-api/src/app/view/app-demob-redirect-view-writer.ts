import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDERedirectViewWriter } from './app-deredirect-view-writer';

export class AppDEMobRedirectViewWriter extends AppDERedirectViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobRedirectView = src

    super.onFillDSL(c, s, d);
  }
}
