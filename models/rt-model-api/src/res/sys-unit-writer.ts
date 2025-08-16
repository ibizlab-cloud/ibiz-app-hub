import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class SysUnitWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysUnit = src

    _.w(d, 'codeName', s);
    _.v(
      d,
      'nameLanguageRes',
      c.s('res.LanguageRes[]', s, 'getNamePSLanguageRes'),
    );
    _.w(d, 'unitTag', s);
    _.w(d, 'unitTag2', s);

    super.onFillDSL(c, s, d);
  }
}
