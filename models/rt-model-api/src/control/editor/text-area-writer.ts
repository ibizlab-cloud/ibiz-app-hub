import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { TextEditorWriter } from './text-editor-writer';

export class TextAreaWriter extends TextEditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSTextArea = src

    _.x(d, 'appDEACModeId', s, 'getPSAppDEACMode');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.x(d, 'pickupAppViewId', s, 'getPickupPSAppView');
    _.w(d, 'enableAC', s);
    _.w(d, 'enablePickupView', s);

    super.onFillDSL(c, s, d);
  }
}
