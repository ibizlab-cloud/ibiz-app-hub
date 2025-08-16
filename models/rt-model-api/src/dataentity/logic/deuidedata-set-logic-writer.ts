import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUIDEDataSetLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUIDEDataSetLogic = src

    _.x(d, 'dstAppDEDataSetId', s, 'getDstPSAppDEDataSet');
    _.x(d, 'dstAppDataEntityId', s, 'getDstPSAppDataEntity');
    _.x(d, 'retDEUILogicParamId', s, 'getRetPSDEUILogicParam');

    super.onFillDSL(c, s, d);
  }
}
