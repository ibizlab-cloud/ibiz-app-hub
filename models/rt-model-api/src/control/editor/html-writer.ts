import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { EditorWriter } from '../editor-writer';

export class HtmlWriter extends EditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSHtml = src

    _.x(d, 'appDEACModeId', s, 'getPSAppDEACMode');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.x(d, 'pickupAppViewId', s, 'getPickupPSAppView');
    _.w(d, 'enableAC', s);
    _.w(d, 'enablePickupView', s);

    super.onFillDSL(c, s, d);
  }
}
