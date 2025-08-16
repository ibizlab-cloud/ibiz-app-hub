import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppBICubeDimensionWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppBICubeDimension = src

    _.w(d, 'codeName', s);
    _.w(d, 'dimensionFormula', s);
    _.w(d, 'dimensionTag', s);
    _.w(d, 'dimensionTag2', s);
    _.w(d, 'dimensionType', s);
    _.v(
      d,
      'appBICubeHierarchies',
      c.m('app.bi.AppBICubeHierarchy[]', s, 'getPSAppBICubeHierarchies'),
    );
    _.x(d, 'appCodeListId', s, 'getPSAppCodeList');
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.x(d, 'paramAppDEUIActionId', s, 'getParamPSAppDEUIAction');
    _.w(d, 'stdDataType', s, '', 0);
    _.x(d, 'textAppDEFieldId', s, 'getTextPSAppDEField');
    _.w(d, 'textTemplate', s);
    _.w(d, 'tipTemplate', s);

    super.onFillDSL(c, s, d);
  }
}
