import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEMultiDataViewWriter } from './app-demulti-data-view-writer';

export class AppDETreeExplorerViewWriter extends AppDEMultiDataViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDETreeExplorerView = src

    _.w(d, 'markOpenDataMode', s);
    _.w(d, 'showDataInfoBar', s);

    super.onFillDSL(c, s, d);
  }
}
