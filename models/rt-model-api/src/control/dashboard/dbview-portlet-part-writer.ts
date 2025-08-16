import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DBSysPortletPartWriter } from './dbsys-portlet-part-writer';

export class DBViewPortletPartWriter extends DBSysPortletPartWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDBViewPortletPart = src

    _.v(
      d,
      'portletAppView',
      c.s('app.view.AppView[]', s, 'getPortletPSAppView'),
    );

    super.onFillDSL(c, s, d);
  }
}
