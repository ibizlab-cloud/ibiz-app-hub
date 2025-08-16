import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppViewMsgWriter } from './app-view-msg-writer';

export class AppDEDataSetViewMsgWriter extends AppViewMsgWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEDataSetViewMsg = src

    _.w(d, 'cacheScope', s);
    _.x(d, 'cacheTag2AppDEFieldId', s, 'getCacheTag2PSAppDEField');
    _.x(d, 'cacheTagAppDEFieldId', s, 'getCacheTagPSAppDEField');
    _.w(d, 'cacheTimeout', s);
    _.x(d, 'contentAppDEFieldId', s, 'getContentPSAppDEField');
    _.x(d, 'contentTypeAppDEFieldId', s, 'getContentTypePSAppDEField');
    _.x(d, 'msgPosAppDEFieldId', s, 'getMsgPosPSAppDEField');
    _.x(d, 'msgTypeAppDEFieldId', s, 'getMsgTypePSAppDEField');
    _.x(d, 'orderValueAppDEFieldId', s, 'getOrderValuePSAppDEField');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'removeFlagAppDEFieldId', s, 'getRemoveFlagPSAppDEField');
    _.x(d, 'titleLanResTagAppDEFieldId', s, 'getTitleLanResTagPSAppDEField');
    _.x(d, 'titleAppDEFieldId', s, 'getTitlePSAppDEField');
    _.w(d, 'enableCache', s);

    super.onFillDSL(c, s, d);
  }
}
