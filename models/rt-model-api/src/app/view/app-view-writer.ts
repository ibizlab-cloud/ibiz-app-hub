import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppViewWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppView = src

    _.w(d, 'accUserMode', s);
    _.w(d, 'accessKey', s);
    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.w(d, 'codeName', s);
    _.w(d, 'dynaSysMode', s, '', 0);
    _.w(d, 'height', s, '', 0);
    _.v(
      d,
      'appCounterRefs',
      c.m('app.control.AppCounterRef[]', s, 'getPSAppCounterRefs'),
    );
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.v(
      d,
      'appViewEngines',
      c.m('app.view.AppViewEngine[]', s, 'getPSAppViewEngines'),
    );
    _.v(
      d,
      'appViewLogics',
      c.m('app.view.AppViewLogic[]', s, 'getPSAppViewLogics'),
    );
    _.x(d, 'appViewMsgGroupId', s, 'getPSAppViewMsgGroup');
    _.v(
      d,
      'appViewNavContexts',
      c.m('app.view.AppViewNavContext[]', s, 'getPSAppViewNavContexts'),
    );
    _.v(
      d,
      'appViewNavParams',
      c.m('app.view.AppViewNavParam[]', s, 'getPSAppViewNavParams'),
    );
    _.v(
      d,
      'appViewParams',
      c.m('app.view.AppViewParam[]', s, 'getPSAppViewParams'),
    );
    _.v(d, 'appViewRefs', c.m('app.view.AppViewRef[]', s, 'getPSAppViewRefs'));
    _.v(d, 'controls', c.m('control.Control[]', s, 'getPSControls'));
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.v(
      d,
      'viewLayoutPanel',
      c.s('control.panel.ViewLayoutPanel[]', s, 'getPSViewLayoutPanel'),
    );
    _.w(d, 'priority', s);
    _.v(
      d,
      'subCapLanguageRes',
      c.s('res.LanguageRes[]', s, 'getSubCapPSLanguageRes'),
    );
    _.w(d, 'subCaption', s);
    _.w(d, 'title', s);
    _.v(
      d,
      'titleLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTitlePSLanguageRes'),
    );
    _.w(d, 'viewStyle', s);
    _.w(d, 'viewType', s);
    _.w(d, 'width', s, '', 0);
    _.w(d, 'enableDP', s);
    _.w(d, 'redirectView', s);
    _.w(d, 'showCaptionBar', s, '', true);

    super.onFillDSL(c, s, d);
  }
}
