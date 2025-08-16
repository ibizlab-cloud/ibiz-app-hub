import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class ControlObjectWriter2 extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSControlObjectNavigatable = src

    _.w(d, 'navFilter', s);
    _.x(d, 'navAppViewId', s, 'getNavPSAppView');
    _.v(d, 'navDER', c.s('dataentity.der.DERBase[]', s, 'getNavPSDER'));
    _.w(d, 'navViewParamJO', s);
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
