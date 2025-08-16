import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { MenuItemWriter } from './menu-item-writer';

export class AppMenuItemWriterBase extends MenuItemWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppMenuItem = src

    _.w(d, 'accUserMode', s);
    _.w(d, 'accessKey', s);
    _.w(d, 'appMenuItemState', s, '', 0);
    _.w(d, 'counterId', s);
    _.w(d, 'cssStyle', s);
    _.w(d, 'data', s);
    _.w(d, 'dynaClass', s);
    _.w(d, 'informTag', s);
    _.w(d, 'informTag2', s);
    _.w(d, 'itemType', s);
    _.x(d, 'appFuncId', s, 'getPSAppFunc');
    _.v(
      d,
      'appMenuItems',
      c.m('control.menu.AppMenuItem[]', s, 'getPSAppMenuItems'),
    );
    _.v(d, 'layout', c.s('control.layout.Layout[]', s, 'getPSLayout'));
    _.v(d, 'layoutPos', c.s('control.layout.LayoutPos[]', s, 'getPSLayoutPos'));
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
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'predefinedType', s);
    _.w(d, 'predefinedTypeParam', s);
    _.w(d, 'titleBarCloseMode', s, '', 0);
    _.w(d, 'disableClose', s);
    _.w(d, 'hidden', s);
    _.w(d, 'hideSideBar', s);
    _.w(d, 'openDefault', s);
    _.w(d, 'spanMode', s);
    _.w(d, 'valid', s, '', true);

    super.onFillDSL(c, s, d);
  }
}
