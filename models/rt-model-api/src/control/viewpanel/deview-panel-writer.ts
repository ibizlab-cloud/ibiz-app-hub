import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlWriter } from '../control-writer';

export class DEViewPanelWriter extends ControlWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEViewPanel = src

    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.x(d, 'embeddedAppDEViewId', s, 'getEmbeddedPSAppDEView');
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

    super.onFillDSL(c, s, d);
  }
}
