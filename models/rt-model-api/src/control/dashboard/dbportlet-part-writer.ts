import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AjaxControlContainerWriter } from '../ajax-control-container-writer';

export class DBPortletPartWriter extends AjaxControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDBPortletPart = src

    _.w(d, 'actionGroupExtractMode', s);
    _.x(d, 'contentControlId', s, 'getContentPSControl');
    _.w(d, 'dynaClass', s);
    _.v(d, 'layoutPos', c.s('control.layout.LayoutPos[]', s, 'getPSLayoutPos'));
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.x(d, 'sysUniResId', s, 'getPSSysUniRes');
    _.v(
      d,
      'uiactionGroup',
      c.s('view.UIActionGroup[]', s, 'getPSUIActionGroup'),
    );
    _.w(d, 'portletType', s);
    _.w(d, 'title', s);
    _.w(d, 'titleBarCloseMode', s, '', 0);
    _.v(
      d,
      'titleLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTitlePSLanguageRes'),
    );
    _.w(d, 'enableAnchor', s);
    _.w(d, 'showTitleBar', s);

    super.onFillDSL(c, s, d);
  }
}
