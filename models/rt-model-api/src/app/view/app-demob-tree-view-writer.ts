import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDETreeViewWriter } from './app-detree-view-writer';

export class AppDEMobTreeViewWriter extends AppDETreeViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobTreeView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
