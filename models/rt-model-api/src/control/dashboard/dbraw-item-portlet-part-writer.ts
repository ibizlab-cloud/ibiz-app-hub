import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DBPortletPartWriter } from './dbportlet-part-writer';

export class DBRawItemPortletPartWriter extends DBPortletPartWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDBRawItemPortletPart = src

    _.v(d, 'rawItem', c.s('control.RawItemBase[]', s, 'getPSRawItem'));

    super.onFillDSL(c, s, d);
  }
}
