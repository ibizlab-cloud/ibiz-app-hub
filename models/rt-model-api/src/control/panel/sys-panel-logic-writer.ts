import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class SysPanelLogicWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysPanelLogic = src

    _.w(d, 'attrName', s);
    _.w(d, 'codeName', s);
    _.w(d, 'eventArg', s);
    _.w(d, 'eventArg2', s);
    _.w(d, 'eventNames', s);
    _.w(d, 'itemName', s);
    _.w(d, 'logicName', s);
    _.w(d, 'logicTrigger', s);
    _.w(d, 'logicType', s);
    _.x(d, 'appDEUIActionId', s, 'getPSAppDEUIAction');
    _.x(d, 'appDEUILogicId', s, 'getPSAppDEUILogic');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.x(d, 'appUILogicId', s, 'getPSAppUILogic');
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'viewCtrlName', s, 'getPSViewCtrlName');
    _.w(d, 'scriptCode', s);
    _.w(d, 'timer', s, '', 0);

    super.onFillDSL(c, s, d);
  }
}
