import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { BuiltinAppUILogicWriterBase } from './builtin-app-uilogic-writer-base';

export class BuiltinAppUIOpenDataLogicWriter extends BuiltinAppUILogicWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppUIOpenDataLogic = src

    _.v(
      d,
      'openDataAppView',
      c.s('app.logic.AppUILogicRefView[]', s, 'getOpenDataPSAppView'),
    );
    _.v(
      d,
      'openDataAppViews',
      c.m('app.logic.AppUILogicRefView[]', s, 'getOpenDataPSAppViews'),
    );
    _.w(d, 'editMode', s);

    super.onFillDSL(c, s, d);
  }
}
