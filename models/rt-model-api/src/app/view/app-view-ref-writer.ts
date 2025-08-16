import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppViewRefWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppViewRef = src

    _.w(d, 'height', s, '', 0);
    _.w(d, 'openMode', s);
    _.w(d, 'owner', s);
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
    _.w(d, 'parentDataJO', s);
    _.w(d, 'realOpenMode', s);
    _.w(d, 'realTitle', s);
    _.v(
      d,
      'realTitleLanguageRes',
      c.s('res.LanguageRes[]', s, 'getRealTitlePSLanguageRes'),
    );
    _.x(d, 'refAppViewId', s, 'getRefPSAppView');
    _.w(d, 'viewParamJO', s);
    _.w(d, 'width', s, '', 0);

    super.onFillDSL(c, s, d);
  }
}
