import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { PickerEditorWriter } from './picker-editor-writer';

export class PickerWriter extends PickerEditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSPicker = src

    _.w(d, 'dropDownViewHeight', s);
    _.w(d, 'dropDownViewWidth', s);
    _.x(d, 'linkAppViewId', s, 'getLinkPSAppView');
    _.w(d, 'dropDownView', s);
    _.w(d, 'enableLinkView', s);
    _.w(d, 'enablePickupView', s);
    _.w(d, 'singleSelect', s);

    super.onFillDSL(c, s, d);
  }
}
