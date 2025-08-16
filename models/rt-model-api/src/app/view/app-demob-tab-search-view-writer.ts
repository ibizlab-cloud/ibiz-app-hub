import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDETabSearchViewWriter } from './app-detab-search-view-writer';

export class AppDEMobTabSearchViewWriter extends AppDETabSearchViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobTabSearchView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
