import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEGanttViewWriter } from './app-degantt-view-writer';

export class AppDEMobGanttViewWriter extends AppDEGanttViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobGanttView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
