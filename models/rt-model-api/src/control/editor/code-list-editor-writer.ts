import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { EditorWriter } from '../editor-writer';

export class CodeListEditorWriter extends EditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSCodeListEditor = src

    _.w(d, 'itemsText', s);
    _.v(
      d,
      'inlineAppCodeList',
      c.s('app.codelist.AppCodeList[]', s, 'getInlinePSAppCodeList'),
    );
    _.x(d, 'appCodeListId', s, 'getPSAppCodeList');
    _.w(d, 'allItems', s);

    super.onFillDSL(c, s, d);
  }
}
