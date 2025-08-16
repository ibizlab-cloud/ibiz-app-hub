import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { CodeListEditorWriter } from './code-list-editor-writer';

export class DropDownListWriter extends CodeListEditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDropDownList = src

    _.w(d, 'singleSelect', s);

    super.onFillDSL(c, s, d);
  }
}
