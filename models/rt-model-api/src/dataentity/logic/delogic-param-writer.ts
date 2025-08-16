import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DELogicParamWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDELogicParam = src

    _.w(d, 'codeName', s);
    _.w(d, 'defaultValue', s);
    _.w(d, 'defaultValueType', s);
    _.w(d, 'fileType', s);
    _.w(d, 'fileUrl', s);
    _.w(d, 'paramTag', s);
    _.w(d, 'paramTag2', s);
    _.w(d, 'params', s);
    _.w(d, 'stdDataType', s, '', 0);
    _.w(d, 'appContextParam', s);
    _.w(d, 'appGlobalParam', s);
    _.w(d, 'cloneParam', s);
    _.w(d, 'default', s);
    _.w(d, 'entityListParam', s);
    _.w(d, 'entityMapParam', s);
    _.w(d, 'entityPageParam', s);
    _.w(d, 'entityParam', s);
    _.w(d, 'envParam', s);
    _.w(d, 'fileListParam', s);
    _.w(d, 'fileParam', s);
    _.w(d, 'filterParam', s);
    _.w(d, 'lastParam', s);
    _.w(d, 'lastReturnParam', s);
    _.w(d, 'originEntity', s);
    _.w(d, 'sessionParam', s);
    _.w(d, 'simpleListParam', s);
    _.w(d, 'simpleParam', s);
    _.w(d, 'webContextParam', s);
    _.w(d, 'webResponseParam', s);

    //let iPSAppDELogicParam = src

    _.x(d, 'paramAppDataEntityId', s, 'getParamPSAppDataEntity');

    super.onFillDSL(c, s, d);
  }
}
