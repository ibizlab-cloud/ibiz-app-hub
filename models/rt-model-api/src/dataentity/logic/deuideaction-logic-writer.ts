import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUIDEActionLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUIDEActionLogic = src

    _.x(d, 'dstAppDEActionId', s, 'getDstPSAppDEAction');
    _.x(d, 'dstAppDataEntityId', s, 'getDstPSAppDataEntity');
    _.x(d, 'retDEUILogicParamId', s, 'getRetPSDEUILogicParam');

    super.onFillDSL(c, s, d);
  }
}
