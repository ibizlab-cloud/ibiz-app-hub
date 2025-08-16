import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEDataImportItemWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDataImportItem = src

    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.w(d, 'createDV', s);
    _.w(d, 'createDVT', s);
    _.x(d, 'codeListId', s, 'getPSCodeList');
    _.w(d, 'updateDV', s);
    _.w(d, 'updateDVT', s);
    _.w(d, 'hiddenDataItem', s);
    _.w(d, 'uniqueItem', s);

    //let iPSAppDEDataImportItem = src

    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');

    super.onFillDSL(c, s, d);
  }
}
