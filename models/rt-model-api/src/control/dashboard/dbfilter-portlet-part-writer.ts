import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DBSysPortletPartWriter } from './dbsys-portlet-part-writer';

export class DBFilterPortletPartWriter extends DBSysPortletPartWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDBFilterPortletPart = src

    _.v(
      d,
      'filterDEDQConditions',
      c.m('dataentity.ds.DEDQCondition[]', s, 'getFilterPSDEDQConditions'),
    );

    super.onFillDSL(c, s, d);
  }
}
