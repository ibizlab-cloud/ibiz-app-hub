import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEViewWriter } from './app-deview-writer';

export class AppDEHtmlViewWriter extends AppDEViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEHtmlView = src

    _.w(d, 'htmlUrl', s);
    _.w(d, 'loadDefault', s);

    super.onFillDSL(c, s, d);
  }
}
