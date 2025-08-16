import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEXDataViewWriter } from './app-dexdata-view-writer';

export class AppDEIndexViewWriter extends AppDEXDataViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEIndexView = src

    _.w(d, 'markOpenDataMode', s);

    super.onFillDSL(c, s, d);
  }
}
