import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AjaxControlHandlerActionWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSControlAction = src

    _.x(d, 'adappDELogicId', s, 'getADPSAppDELogic');
    _.w(d, 'actionDesc', s);
    _.x(d, 'appDEMethodId', s, 'getPSAppDEMethod');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.w(d, 'timeout', s);

    super.onFillDSL(c, s, d);
  }
}
