import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEViewWriter } from './app-deview-writer';

export class AppDEExplorerViewWriter extends AppDEViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEExplorerView = src

    _.w(d, 'markOpenDataMode', s);
    _.w(d, 'loadDefault', s);
    _.w(d, 'showDataInfoBar', s);

    super.onFillDSL(c, s, d);
  }
}
