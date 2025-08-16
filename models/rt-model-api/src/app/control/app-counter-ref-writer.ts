import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysCounterRefWriter } from '../../control/counter/sys-counter-ref-writer';

export class AppCounterRefWriter extends SysCounterRefWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppCounterRef = src

    _.v(d, 'appCounter', c.s('app.control.AppCounter[]', s, 'getPSAppCounter'));

    super.onFillDSL(c, s, d);
  }
}
