import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUICtrlInvokeLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUICtrlInvokeLogic = src

    _.x(d, 'invokeCtrlId', s, 'getInvokeCtrl');
    _.w(d, 'invokeMethod', s);
    _.x(d, 'invokeParamId', s, 'getInvokeParam');

    super.onFillDSL(c, s, d);
  }
}
