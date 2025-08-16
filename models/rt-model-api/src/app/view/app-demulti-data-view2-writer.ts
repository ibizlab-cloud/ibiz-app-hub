import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEMultiDataViewWriter } from './app-demulti-data-view-writer';

export class AppDEMultiDataView2Writer extends AppDEMultiDataViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMultiDataView2 = src

    _.w(d, 'mdctrlActiveMode', s, 'mDCtrlActiveMode');

    super.onFillDSL(c, s, d);
  }
}
