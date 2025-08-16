import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { EditorWriter } from './editor-writer';

export class AjaxEditorWriter extends EditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAjaxEditor = src

    _.w(d, 'handlerType', s);

    super.onFillDSL(c, s, d);
  }
}
