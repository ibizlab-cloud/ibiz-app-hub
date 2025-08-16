import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppViewWriter } from './app-view-writer';

export class AppUtilViewWriter extends AppViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppUtilView = src

    super.onFillDSL(c, s, d);
  }
}
