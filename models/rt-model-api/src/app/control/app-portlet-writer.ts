import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppPortletWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppPortlet = src

    _.w(d, 'codeName', s);
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.v(
      d,
      'appPortletCat',
      c.s('app.control.AppPortletCat[]', s, 'getPSAppPortletCat'),
    );
    _.v(d, 'control', c.s('control.Control[]', s, 'getPSControl'));
    _.w(d, 'portletParams', s);
    _.w(d, 'enableAppDashboard', s);
    _.w(d, 'enableDEDashboard', s);

    super.onFillDSL(c, s, d);
  }
}
