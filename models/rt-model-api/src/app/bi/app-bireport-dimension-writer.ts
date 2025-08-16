import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppBIReportDimensionWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppBIReportDimension = src

    _.w(d, 'dimensionFormula', s);
    _.w(d, 'dimensionName', s);
    _.w(d, 'dimensionParams', s);
    _.w(d, 'dimensionTag', s);
    _.w(d, 'dimensionType', s);
    _.w(d, 'itemTag', s);
    _.w(d, 'itemTag2', s);
    _.x(d, 'appCodeListId', s, 'getPSAppCodeList');
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.w(d, 'placeType', s);
    _.w(d, 'placement', s);
    _.w(d, 'stdDataType', s, '', 0);
    _.x(d, 'textAppDEFieldId', s, 'getTextPSAppDEField');
    _.w(d, 'textTemplate', s);
    _.w(d, 'tipTemplate', s);

    super.onFillDSL(c, s, d);
  }
}
