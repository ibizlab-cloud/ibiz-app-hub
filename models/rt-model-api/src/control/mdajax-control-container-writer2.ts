import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { MDAjaxControlContainerWriter } from './mdajax-control-container-writer';

export class MDAjaxControlContainerWriter2 extends MDAjaxControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSControlNavigatable = src

    _.w(d, 'navFilter', s);
    _.x(d, 'navAppViewId', s, 'getNavPSAppView');
    _.v(d, 'navDER', c.s('dataentity.der.DERBase[]', s, 'getNavPSDER'));
    _.w(d, 'navViewHeight', s, '', 0.0);
    _.w(d, 'navViewMaxHeight', s, '', 0.0);
    _.w(d, 'navViewMaxWidth', s, '', 0.0);
    _.w(d, 'navViewMinHeight', s, '', 0.0);
    _.w(d, 'navViewMinWidth', s, '', 0.0);
    _.w(d, 'navViewParamJO', s);
    _.w(d, 'navViewPos', s, '', 'NONE');
    _.w(d, 'navViewShowMode', s, '', 0);
    _.w(d, 'navViewWidth', s, '', 0.0);
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
