import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEXDataViewWriter } from './app-dexdata-view-writer';

export class AppDEEditViewWriter extends AppDEXDataViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEEditView = src

    _.w(d, 'markOpenDataMode', s);
    _.w(d, 'multiFormMode', s, '', 0);
    _.w(d, 'enableDirtyChecking', s, '', true);
    _.w(d, 'hideEditForm', s);
    _.w(d, 'manualAppendForms', s);
    _.w(d, 'showDataInfoBar', s);

    super.onFillDSL(c, s, d);
  }
}
