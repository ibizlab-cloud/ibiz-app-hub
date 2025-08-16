import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicNodeWriter } from './deuilogic-node-writer';

export class DEUIActionLogicWriter extends DEUILogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUIActionLogic = src

    _.x(d, 'dstAppDEUIActionId', s, 'getDstPSAppDEUIAction');
    _.x(d, 'dstAppDataEntityId', s, 'getDstPSAppDataEntity');

    super.onFillDSL(c, s, d);
  }
}
