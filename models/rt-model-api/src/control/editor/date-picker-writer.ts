import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { EditorWriter } from '../editor-writer';

export class DatePickerWriter extends EditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDatePicker = src

    _.w(d, 'dateTimeFormat', s);

    super.onFillDSL(c, s, d);
  }
}
