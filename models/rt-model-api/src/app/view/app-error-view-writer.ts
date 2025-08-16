import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppUtilViewWriter } from './app-util-view-writer';

export class AppErrorViewWriter extends AppUtilViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppErrorView = src

    _.w(d, 'errorCode', s);

    super.onFillDSL(c, s, d);
  }
}
