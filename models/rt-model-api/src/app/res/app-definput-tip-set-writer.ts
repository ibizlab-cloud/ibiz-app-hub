import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppDEFInputTipSetWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEFInputTipSet = src

    _.x(d, 'contentAppDEFieldId', s, 'getContentPSAppDEField');
    _.x(d, 'enableCloseAppDEFieldId', s, 'getEnableClosePSAppDEField');
    _.x(d, 'linkAppDEFieldId', s, 'getLinkPSAppDEField');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.x(d, 'uniqueTagAppDEFieldId', s, 'getUniqueTagPSAppDEField');

    super.onFillDSL(c, s, d);
  }
}
