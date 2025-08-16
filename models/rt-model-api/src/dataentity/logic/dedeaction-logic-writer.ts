import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DEDEActionLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDEActionLogic = src

    _.x(d, 'dstAppDEActionId', s, 'getDstPSAppDEAction');
    _.x(d, 'dstAppDataEntityId', s, 'getDstPSAppDataEntity');
    _.x(d, 'dstDELogicParamId', s, 'getDstPSDELogicParam');
    _.x(d, 'retDELogicParamId', s, 'getRetPSDELogicParam');

    super.onFillDSL(c, s, d);
  }
}
