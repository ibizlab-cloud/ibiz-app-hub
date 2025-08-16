import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppUtilViewWriter } from './app-util-view-writer';

export class AppFuncPickupViewWriter extends AppUtilViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppFuncPickupView = src

    super.onFillDSL(c, s, d);
  }
}
