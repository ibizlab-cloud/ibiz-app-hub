import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppViewLogicWriterBase extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppViewLogic = src

    _.w(d, 'attrName', s);
    _.w(d, 'eventArg', s);
    _.w(d, 'eventArg2', s);
    _.w(d, 'eventNames', s);
    _.w(d, 'itemName', s);
    _.w(d, 'logicTrigger', s);
    _.w(d, 'logicType', s);
    _.w(d, 'owner', s);
    _.x(d, 'appDEUIActionId', s, 'getPSAppDEUIAction');
    _.x(d, 'appDEUILogicId', s, 'getPSAppDEUILogic');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    if (_.g(s, 'getPSAppUILogic')) {
      if (_.g(_.g(s, 'getPSAppUILogic'), 'name')) {
        _.v(
          d,
          'builtinAppUILogic',
          c.s('app.logic.AppUILogic[]', s, 'getPSAppUILogic'),
        );
      } else {
        _.x(d, 'appUILogicId', s, 'getPSAppUILogic');
      }
    }
    _.x(d, 'appViewEngineId', s, 'getPSAppViewEngine');
    _.x(d, 'appViewLogicId', s, 'getPSAppViewLogic');
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'ctrlName', s, 'getPSViewCtrlName');
    _.w(d, 'scriptCode', s);
    _.w(d, 'timer', s, '', 0);
    _.w(d, 'builtinLogic', s, '', true);

    super.onFillDSL(c, s, d);
  }
}
