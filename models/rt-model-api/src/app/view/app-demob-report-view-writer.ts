import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEReportViewWriter } from './app-dereport-view-writer';

export class AppDEMobReportViewWriter extends AppDEReportViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobReportView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
