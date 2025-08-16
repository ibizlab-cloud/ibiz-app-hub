import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppUtilWriter } from './app-util-writer';

export class AppDynaUtilWriterBase extends AppUtilWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDynaUtilBase = src

    _.x(d, 'appIdAppDEFieldId', s, 'getAppIdPSAppDEField');
    _.x(d, 'createAppDEActionId', s, 'getCreatePSAppDEAction');
    _.x(d, 'getAppDEActionId', s, 'getGetPSAppDEAction');
    _.x(d, 'modelIdAppDEFieldId', s, 'getModelIdPSAppDEField');
    _.x(d, 'modelAppDEFieldId', s, 'getModelPSAppDEField');
    _.x(d, 'removeAppDEActionId', s, 'getRemovePSAppDEAction');
    _.x(d, 'stoageAppDataEntityId', s, 'getStoagePSAppDataEntity');
    _.x(d, 'storageAppDataEntityId', s, 'getStoragePSAppDataEntity');
    _.x(d, 'updateAppDEActionId', s, 'getUpdatePSAppDEAction');
    _.x(d, 'userIdAppDEFieldId', s, 'getUserIdPSAppDEField');

    super.onFillDSL(c, s, d);
  }
}
