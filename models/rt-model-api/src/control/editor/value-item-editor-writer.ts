import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { EditorWriter } from '../editor-writer';

export class ValueItemEditorWriter extends EditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSValueItemEditor = src

    _.w(d, 'valueItemName', s);

    super.onFillDSL(c, s, d);
  }
}
