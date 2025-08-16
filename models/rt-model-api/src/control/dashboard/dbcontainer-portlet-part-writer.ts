import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DBPortletPartWriter } from './dbportlet-part-writer';

export class DBContainerPortletPartWriter extends DBPortletPartWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDBContainerPortletPart = src

    _.v(d, 'layout', c.s('control.layout.Layout[]', s, 'getPSLayout'));

    super.onFillDSL(c, s, d);
  }
}
