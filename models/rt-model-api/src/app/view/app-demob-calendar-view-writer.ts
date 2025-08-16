import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDECalendarViewWriter } from './app-decalendar-view-writer';

export class AppDEMobCalendarViewWriter extends AppDECalendarViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobCalendarView = src

    _.w(d, 'enablePullDownRefresh', s);

    super.onFillDSL(c, s, d);
  }
}
