import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEViewWriter } from './app-deview-writer';

export class AppDEXDataViewWriter extends AppDEViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEXDataView = src

    _.w(d, 'xdataControlName', s, 'xDataControlName');
    _.w(d, 'loadDefault', s, '', true);

    super.onFillDSL(c, s, d);
  }
}
