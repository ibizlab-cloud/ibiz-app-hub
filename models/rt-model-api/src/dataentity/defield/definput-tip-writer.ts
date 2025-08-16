import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEFInputTipWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFInputTip = src

    _.w(d, 'codeName', s);
    _.w(d, 'content', s);
    _.v(
      d,
      'contentLanguageRes',
      c.s('res.LanguageRes[]', s, 'getContentPSLanguageRes'),
    );
    _.w(d, 'htmlContent', s);
    _.w(d, 'rawContent', s);
    _.w(d, 'tipMode', s);
    _.w(d, 'uniqueTag', s);
    _.w(d, 'default', s);

    super.onFillDSL(c, s, d);
  }
}
