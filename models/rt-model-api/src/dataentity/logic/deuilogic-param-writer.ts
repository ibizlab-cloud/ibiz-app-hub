import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEUILogicParamWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUILogicParam = src

    _.w(d, 'codeName', s);
    _.w(d, 'defaultValue', s);
    _.w(d, 'defaultValueType', s);
    _.w(d, 'paramFieldName', s);
    _.w(d, 'paramTag', s);
    _.w(d, 'paramTag2', s);
    _.w(d, 'stdDataType', s, '', 0);
    _.w(d, 'activeContainerParam', s);
    _.w(d, 'activeCtrlParam', s);
    _.w(d, 'activeViewParam', s);
    _.w(d, 'appGlobalParam', s);
    _.w(d, 'applicationParam', s);
    _.w(d, 'ctrlParam', s);
    _.w(d, 'default', s);
    _.w(d, 'entityListParam', s);
    _.w(d, 'entityMapParam', s);
    _.w(d, 'entityPageParam', s);
    _.w(d, 'entityParam', s);
    _.w(d, 'envParam', s);
    _.w(d, 'filterParam', s);
    _.w(d, 'lastReturnParam', s);
    _.w(d, 'navContextParam', s);
    _.w(d, 'navViewParamParam', s);
    _.w(d, 'routeViewSessionParam', s);
    _.w(d, 'sessionParam', s);
    _.w(d, 'simpleListParam', s);
    _.w(d, 'simpleParam', s);
    _.w(d, 'viewNavDataParam', s);
    _.w(d, 'viewSessionParam', s);

    super.onFillDSL(c, s, d);
  }
}
