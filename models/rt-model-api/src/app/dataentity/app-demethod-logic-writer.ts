import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppDEMethodLogicWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMethodLogic = src

    _.w(d, 'actionLogicType', s);
    _.w(d, 'attachMode', s);
    _.w(d, 'scriptCode', s);
    _.w(d, 'ignoreException', s);

    //let iPSAppDEActionLogic = src

    _.x(d, 'dstAppDEActionId', s, 'getDstPSAppDEAction');
    _.x(d, 'dstAppDataEntityId', s, 'getDstPSAppDataEntity');
    _.x(d, 'appDELogicId', s, 'getPSAppDELogic');
    _.w(d, 'cloneParam', s);
    _.w(d, 'internalLogic', s);

    super.onFillDSL(c, s, d);
  }
}
