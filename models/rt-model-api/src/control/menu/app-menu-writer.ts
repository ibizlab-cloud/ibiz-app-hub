import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AjaxControlWriter } from '../ajax-control-writer';

export class AppMenuWriter extends AjaxControlWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppMenu = src

    _.w(d, 'appMenuStyle', s);
    _.w(d, 'layoutMode', s);
    _.x(d, 'appCounterRefId', s, 'getPSAppCounterRef');
    _.v(
      d,
      'appMenuItems',
      c.m('control.menu.AppMenuItem[]', s, 'getPSAppMenuItems'),
    );
    _.v(d, 'layout', c.s('control.layout.Layout[]', s, 'getPSLayout'));
    _.w(d, 'enableCustomized', s);

    super.onFillDSL(c, s, d);
  }
}
