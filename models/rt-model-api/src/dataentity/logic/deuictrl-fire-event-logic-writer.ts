import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUICtrlFireEventLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUICtrlFireEventLogic = src

    _.w(d, 'eventName', s);
    _.x(d, 'eventParamId', s, 'getEventParam');
    _.x(d, 'fireCtrlId', s, 'getFireCtrl');

    super.onFillDSL(c, s, d);
  }
}
