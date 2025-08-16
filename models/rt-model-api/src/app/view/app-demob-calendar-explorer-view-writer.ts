import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDECalendarExplorerViewWriter } from './app-decalendar-explorer-view-writer';

export class AppDEMobCalendarExplorerViewWriter extends AppDECalendarExplorerViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobCalendarExplorerView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
