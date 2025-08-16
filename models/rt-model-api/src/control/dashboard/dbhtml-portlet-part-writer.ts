import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DBSysPortletPartWriter } from './dbsys-portlet-part-writer';

export class DBHtmlPortletPartWriter extends DBSysPortletPartWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDBHtmlPortletPart = src

    _.w(d, 'htmlShowMode', s);
    _.w(d, 'pageUrl', s);

    super.onFillDSL(c, s, d);
  }
}
