import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class SysCounterWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysCounter = src

    _.w(d, 'codeName', s);
    _.w(d, 'counterData', s);
    _.w(d, 'counterData2', s);
    _.w(d, 'counterType', s);
    _.w(d, 'customCond', s);
    _.w(d, 'counterId', s, 'getPSCounterId');
    _.v(
      d,
      'navigateContexts',
      c.m('control.NavigateContext[]', s, 'getPSNavigateContexts'),
    );
    _.v(
      d,
      'navigateParams',
      c.m('control.NavigateParam[]', s, 'getPSNavigateParams'),
    );
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'timer', s, '', 0);
    _.w(d, 'uniqueTag', s);

    super.onFillDSL(c, s, d);
  }
}
