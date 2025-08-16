import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DEDEDataSetLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDEDataSetLogic = src

    _.x(d, 'dstAppDEDataSetId', s, 'getDstPSAppDEDataSet');
    _.x(d, 'dstAppDataEntityId', s, 'getDstPSAppDataEntity');
    _.x(d, 'dstDELogicParamId', s, 'getDstPSDELogicParam');
    _.x(d, 'retDELogicParamId', s, 'getRetPSDELogicParam');

    super.onFillDSL(c, s, d);
  }
}
