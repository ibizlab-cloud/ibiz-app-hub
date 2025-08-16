import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysViewLogicWriter } from '../../res/sys-view-logic-writer';

export class AppUILogicWriter extends SysViewLogicWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppUILogic = src

    _.x(d, 'appDEUILogicId', s, 'getPSAppDEUILogic');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.v(
      d,
      'appUILogicRefViews',
      c.m('app.logic.AppUILogicRefView[]', s, 'getPSAppUILogicRefViews'),
    );
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'builtinLogic', s, '', true);

    super.onFillDSL(c, s, d);
  }
}
