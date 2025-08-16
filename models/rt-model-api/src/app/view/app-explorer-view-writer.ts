import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppViewWriter } from './app-view-writer';

export class AppExplorerViewWriter extends AppViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppExplorerView = src

    super.onFillDSL(c, s, d);
  }
}
