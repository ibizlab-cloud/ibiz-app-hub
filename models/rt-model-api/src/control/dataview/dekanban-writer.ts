import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEDataViewWriter } from './dedata-view-writer';

export class DEKanbanWriter extends DEDataViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEKanban = src

    _.v(
      d,
      'updateGroupControlAction',
      c.s('control.ControlAction[]', s, 'getUpdateGroupPSControlAction'),
    );

    super.onFillDSL(c, s, d);
  }
}
