import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { PickerEditorWriter } from './picker-editor-writer';

export class MailAddressWriter extends PickerEditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSMailAddress = src

    _.w(d, 'enablePickupView', s);

    super.onFillDSL(c, s, d);
  }
}
