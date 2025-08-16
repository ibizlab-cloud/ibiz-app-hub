import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { TextEditorWriter } from './text-editor-writer';

export class MarkdownWriter extends TextEditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSMarkdown = src

    _.w(d, 'mode', s);
    _.x(d, 'appDEACModeId', s, 'getPSAppDEACMode');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.x(d, 'pickupAppViewId', s, 'getPickupPSAppView');
    _.w(d, 'enableAC', s);
    _.w(d, 'enablePickupView', s);

    super.onFillDSL(c, s, d);
  }
}
