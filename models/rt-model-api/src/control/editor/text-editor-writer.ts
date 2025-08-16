import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { EditorWriter } from '../editor-writer';

export class TextEditorWriter extends EditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSTextEditor = src

    _.w(d, 'maxLength', s);
    _.w(d, 'minLength', s, '', 0);
    _.x(d, 'appCodeListId', s, 'getPSAppCodeList');
    _.v(
      d,
      'sysValueRule',
      c.s('valuerule.SysValueRule[]', s, 'getPSSysValueRule'),
    );
    _.w(d, 'showMaxLength', s);

    super.onFillDSL(c, s, d);
  }
}
