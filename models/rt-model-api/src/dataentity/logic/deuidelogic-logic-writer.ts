import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUIDELogicLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUIDELogicLogic = src

    _.x(d, 'dstAppDELogicId', s, 'getDstPSAppDELogic');
    _.x(d, 'dstAppDataEntityId', s, 'getDstPSAppDataEntity');
    _.x(d, 'retDEUILogicParamId', s, 'getRetPSDEUILogicParam');

    super.onFillDSL(c, s, d);
  }
}
