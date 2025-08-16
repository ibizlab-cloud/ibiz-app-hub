import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppFuncWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppFunc = src

    _.w(d, 'appFuncType', s);
    _.w(d, 'codeName', s);
    _.w(d, 'funcSN', s);
    _.w(d, 'htmlPageUrl', s);
    _.w(d, 'jscode', s, 'jSCode');
    _.v(
      d,
      'nameLanguageRes',
      c.s('res.LanguageRes[]', s, 'getNamePSLanguageRes'),
    );
    _.w(d, 'openMode', s);
    _.w(d, 'openViewParam', s);
    _.x(d, 'appDEACModeId', s, 'getPSAppDEACMode');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.x(d, 'appViewId', s, 'getPSAppView');
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
    _.w(d, 'pdtappFuncId', s, 'getPSPDTAppFuncId');
    _.x(d, 'uiactionId', s, 'getPSUIAction');
    _.w(d, 'predefinedType', s);
    _.w(d, 'predefinedTypeParam', s);
    _.w(d, 'tooltip', s);
    _.v(
      d,
      'tooltipLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTooltipPSLanguageRes'),
    );
    _.w(d, 'userData', s);
    _.w(d, 'userData2', s);
    _.w(d, 'systemReserved', s);

    super.onFillDSL(c, s, d);
  }
}
