import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppDEMethodWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMethod = src

    _.w(d, 'codeName', s);
    _.w(d, 'codeName2', s);
    _.w(d, 'methodType', s);
    _.v(
      d,
      'appDEMethodInput',
      c.s('app.dataentity.AppDEMethodInput[]', s, 'getPSAppDEMethodInput'),
    );
    _.v(
      d,
      'appDEMethodReturn',
      c.s('app.dataentity.AppDEMethodReturn[]', s, 'getPSAppDEMethodReturn'),
    );
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'requestField', s);
    _.w(d, 'requestFullPaths', s, 'requestFullPaths');
    _.w(d, 'requestMethod', s);
    _.w(d, 'requestParamType', s);
    _.w(d, 'requestPath', s);
    _.w(d, 'tempDataMode', s, '', 0);
    _.w(d, 'builtinMethod', s);
    _.w(d, 'needResourceKey', s);
    _.w(d, 'noServiceCodeName', s);

    //let iPSAppDEAction = src

    _.w(d, 'actionMode', s);
    _.w(d, 'actionName', s);
    _.w(d, 'actionTag', s);
    _.w(d, 'actionType', s, '', 'REMOTE');
    _.w(d, 'afterCode', s);
    _.w(d, 'batchActionMode', s, '', 0);
    _.w(d, 'beforeCode', s);
    _.x(d, 'appDELogicId', s, 'getPSAppDELogic');
    _.w(d, 'scriptCode', s);
    _.w(d, 'asyncAction', s);
    _.w(d, 'customCode', s);
    _.w(d, 'enableBatchAction', s);
    _.w(d, 'enableTestMethod', s);

    //let iPSAppDEDataSet = src

    _.v(
      d,
      'addedqconditions',
      c.m('dataentity.ds.DEDQCondition[]', s, 'getADPSDEDQConditions'),
    );
    _.w(d, 'dataSetName', s);
    _.w(d, 'dataSetTag', s);
    _.w(d, 'dataSetType', s, '', 'REMOTE');
    _.x(d, 'appCodeListId', s, 'getPSAppCodeList');
    _.v(
      d,
      'dedqgroupConditions',
      c.m('dataentity.ds.DEDQGroupCondition[]', s, 'getPSDEDQGroupConditions'),
    );
    _.w(d, 'predefinedType', s);

    super.onFillDSL(c, s, d);
  }
}
