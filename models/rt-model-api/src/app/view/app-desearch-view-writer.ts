import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEViewWriter } from './app-deview-writer';

export class AppDESearchViewWriter extends AppDEViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDESearchView = src

    _.w(d, 'enableQuickSearch', s);
    _.w(d, 'enableSearch', s);
    _.w(d, 'expandSearchForm', s);
    _.w(d, 'loadDefault', s);

    //let iPSAppDESearchView2 = src

    _.x(d, 'quickGroupCodeListId', s, 'getQuickGroupPSCodeList');
    _.w(d, 'enableQuickGroup', s);

    super.onFillDSL(c, s, d);
  }
}
