import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppBIReportMeasureWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppBIReportMeasure = src

    _.w(d, 'aggMode', s);
    _.x(d, 'drillDetailAppViewId', s, 'getDrillDetailPSAppView');
    _.x(d, 'drillDownAppViewId', s, 'getDrillDownPSAppView');
    _.w(d, 'itemTag', s);
    _.w(d, 'itemTag2', s);
    _.w(d, 'jsonFormat', s);
    _.w(d, 'measureFormula', s);
    _.w(d, 'measureGroup', s);
    _.w(d, 'measureName', s);
    _.w(d, 'measureParams', s);
    _.w(d, 'measureTag', s);
    _.w(d, 'measureType', s);
    _.x(d, 'appCodeListId', s, 'getPSAppCodeList');
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.w(d, 'placeType', s);
    _.w(d, 'stdDataType', s, '', 0);
    _.w(d, 'textTemplate', s);
    _.w(d, 'tipTemplate', s);

    super.onFillDSL(c, s, d);
  }
}
