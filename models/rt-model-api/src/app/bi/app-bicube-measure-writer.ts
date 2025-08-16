import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppBICubeMeasureWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppBICubeMeasure = src

    _.w(d, 'aggMode', s);
    _.w(d, 'codeName', s);
    _.x(d, 'drillDetailAppViewId', s, 'getDrillDetailPSAppView');
    _.x(d, 'drillDownAppViewId', s, 'getDrillDownPSAppView');
    _.w(d, 'jsonFormat', s);
    _.w(d, 'measureFormula', s);
    _.w(d, 'measureGroup', s);
    _.w(d, 'measureTag', s);
    _.w(d, 'measureTag2', s);
    _.w(d, 'measureType', s);
    _.x(d, 'appCodeListId', s, 'getPSAppCodeList');
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.x(d, 'paramAppDEUIActionId', s, 'getParamPSAppDEUIAction');
    _.w(d, 'stdDataType', s, '', 0);
    _.w(d, 'textTemplate', s);
    _.w(d, 'tipTemplate', s);
    _.w(d, 'dataItem', s);

    super.onFillDSL(c, s, d);
  }
}
