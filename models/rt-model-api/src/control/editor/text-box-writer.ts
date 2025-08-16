import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { TextEditorWriter } from './text-editor-writer';

export class TextBoxWriter extends TextEditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSTextBox = src

    _.w(d, 'maxValue', s);
    _.w(d, 'minValue', s);
    _.w(d, 'precision', s);

    super.onFillDSL(c, s, d);
  }
}
