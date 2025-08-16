import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DBPortletPartWriter } from './dbportlet-part-writer';

export class DBAppViewPortletPartWriter extends DBPortletPartWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDBAppViewPortletPart = src

    _.v(
      d,
      'portletAppView',
      c.s('app.view.AppView[]', s, 'getPortletPSAppView'),
    );

    super.onFillDSL(c, s, d);
  }
}
