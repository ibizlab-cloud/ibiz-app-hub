import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUIMsgBoxLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUIMsgBoxLogic = src

    _.w(d, 'buttonsType', s);
    _.w(d, 'message', s);
    _.x(d, 'msgBoxParamId', s, 'getMsgBoxParam');
    _.w(d, 'msgBoxType', s);
    _.w(d, 'showMode', s);
    _.w(d, 'title', s);

    super.onFillDSL(c, s, d);
  }
}
