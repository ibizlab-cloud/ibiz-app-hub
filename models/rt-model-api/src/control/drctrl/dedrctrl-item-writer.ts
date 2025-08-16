import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEDRCtrlItemWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDRCtrlItem = src

    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.w(d, 'counterId', s);
    _.w(d, 'counterMode', s, '', 0);
    _.w(d, 'dataAccessAction', s);
    _.w(d, 'enableMode', s);
    _.x(d, 'headerSysPFPluginId', s, 'getHeaderPSSysPFPlugin');
    _.w(d, 'itemTag', s);
    _.w(d, 'itemTag2', s);
    _.x(d, 'appViewId', s, 'getPSAppView');
    _.v(
      d,
      'controlAttributes',
      c.m('control.ControlAttribute[]', s, 'getPSControlAttributes'),
    );
    _.v(
      d,
      'controlLogics',
      c.m('control.ControlLogic[]', s, 'getPSControlLogics'),
    );
    _.v(
      d,
      'controlRenders',
      c.m('control.ControlRender[]', s, 'getPSControlRenders'),
    );
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
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.x(d, 'testAppDELogicId', s, 'getTestPSAppDELogic');
    _.w(d, 'testScriptCode', s);

    super.onFillDSL(c, s, d);
  }
}
