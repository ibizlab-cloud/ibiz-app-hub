import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { BuiltinAppUILogicWriterBase } from './builtin-app-uilogic-writer-base';

export class BuiltinAppUINewDataLogicWriter extends BuiltinAppUILogicWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppUINewDataLogic = src

    _.w(d, 'actionAfterWizard', s);
    _.x(d, 'batchAddAppDEActionId', s, 'getBatchAddPSAppDEAction');
    _.v(
      d,
      'batchAddAppViews',
      c.m('app.logic.AppUILogicRefView[]', s, 'getBatchAddPSAppViews'),
    );
    _.v(
      d,
      'newDataAppView',
      c.s('app.logic.AppUILogicRefView[]', s, 'getNewDataPSAppView'),
    );
    _.v(
      d,
      'newDataAppViews',
      c.m('app.logic.AppUILogicRefView[]', s, 'getNewDataPSAppViews'),
    );
    _.v(
      d,
      'wizardAppView',
      c.s('app.logic.AppUILogicRefView[]', s, 'getWizardPSAppView'),
    );
    _.w(d, 'batchAddOnly', s);
    _.w(d, 'enableBatchAdd', s);
    _.w(d, 'enableWizardAdd', s);

    super.onFillDSL(c, s, d);
  }
}
