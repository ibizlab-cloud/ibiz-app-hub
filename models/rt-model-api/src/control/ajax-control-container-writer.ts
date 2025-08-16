import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ControlContainerWriter } from './control-container-writer';

export class AjaxControlContainerWriter extends ControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAjaxControl = src

    _.v(
      d,
      'user2ControlAction',
      c.s('control.ControlAction[]', s, 'getUser2PSControlAction'),
    );
    _.v(
      d,
      'userControlAction',
      c.s('control.ControlAction[]', s, 'getUserPSControlAction'),
    );
    _.w(d, 'autoLoad', s, '', true);
    _.w(d, 'enableItemPrivilege', s);
    _.w(d, 'showBusyIndicator', s, '', true);

    super.onFillDSL(c, s, d);
  }
}
