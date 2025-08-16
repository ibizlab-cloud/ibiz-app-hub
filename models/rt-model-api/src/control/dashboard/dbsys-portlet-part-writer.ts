import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DBPortletPartWriter } from './dbportlet-part-writer';

export class DBSysPortletPartWriter extends DBPortletPartWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDBSysPortletPart = src

    _.w(d, 'timer', s, '', 0);

    super.onFillDSL(c, s, d);
  }
}
