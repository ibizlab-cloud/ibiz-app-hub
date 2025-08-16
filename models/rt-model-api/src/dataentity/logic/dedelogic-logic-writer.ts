import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DEDELogicLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDELogicLogic = src

    _.x(d, 'dstAppDELogicId', s, 'getDstPSAppDELogic');
    _.x(d, 'dstAppDataEntityId', s, 'getDstPSAppDataEntity');
    _.x(d, 'dstDELogicParamId', s, 'getDstPSDELogicParam');
    _.x(d, 'retDELogicParamId', s, 'getRetPSDELogicParam');

    super.onFillDSL(c, s, d);
  }
}
