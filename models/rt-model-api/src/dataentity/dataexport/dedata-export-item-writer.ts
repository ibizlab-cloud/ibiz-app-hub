import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEDataExportItemWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDataExportItem = src

    _.w(d, 'align', s);
    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.w(d, 'defaultValue', s);
    _.w(d, 'format', s);
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.x(d, 'codeListId', s, 'getPSCodeList');
    _.w(d, 'privilegeId', s);
    _.w(d, 'hidden', s);

    super.onFillDSL(c, s, d);
  }
}
