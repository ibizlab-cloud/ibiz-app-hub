import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEActionWriterBase extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEAction = src

    _.w(d, 'actionHolder', s, '', 3);
    _.w(d, 'actionMode', s);
    _.w(d, 'actionTag', s);
    _.w(d, 'actionTag2', s);
    _.w(d, 'actionTag3', s);
    _.w(d, 'actionTag4', s);
    _.w(d, 'actionType', s);
    _.v(
      d,
      'afterDEActionLogics',
      c.m('dataentity.action.DEActionLogic[]', s, 'getAfterPSDEActionLogics'),
    );
    _.w(d, 'batchActionMode', s, '', 0);
    _.v(
      d,
      'beforeDEActionLogics',
      c.m('dataentity.action.DEActionLogic[]', s, 'getBeforePSDEActionLogics'),
    );
    _.v(
      d,
      'checkDEActionLogics',
      c.m('dataentity.action.DEActionLogic[]', s, 'getCheckPSDEActionLogics'),
    );
    _.w(d, 'codeName', s);
    _.w(d, 'extendMode', s, '', 0);
    _.w(d, 'logicName', s);
    _.w(d, 'orderValue', s, '', 99999);
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'paramMode', s, '', 1);
    _.v(
      d,
      'prepareDEActionLogics',
      c.m('dataentity.action.DEActionLogic[]', s, 'getPreparePSDEActionLogics'),
    );
    _.w(d, 'tempDataMode', s, '', 0);
    _.w(d, 'testActionMode', s, '', 0);
    _.w(d, 'timeOut', s);
    _.w(d, 'asyncAction', s);
    _.w(d, 'batchAction', s);
    _.w(d, 'builtinAction', s);
    _.w(d, 'customParam', s);
    _.w(d, 'enableBackend', s, '', true);
    _.w(d, 'enableFront', s, '', true);
    _.w(d, 'enableTempData', s);
    _.w(d, 'valid', s, '', true);

    super.onFillDSL(c, s, d);
  }
}
