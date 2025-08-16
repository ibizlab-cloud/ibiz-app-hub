import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDESearchViewWriter } from './app-desearch-view-writer';

export class AppDEReportViewWriter extends AppDESearchViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEReportView = src

    _.w(d, 'markOpenDataMode', s);

    super.onFillDSL(c, s, d);
  }
}
