import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEExplorerViewWriter } from './app-deexplorer-view-writer';

export class AppDETabExplorerViewWriter extends AppDEExplorerViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDETabExplorerView = src

    _.w(d, 'tabLayout', s);

    //let iPSAppDESearchView = src

    _.w(d, 'enableQuickSearch', s);
    _.w(d, 'enableSearch', s);
    _.w(d, 'expandSearchForm', s);

    super.onFillDSL(c, s, d);
  }
}
