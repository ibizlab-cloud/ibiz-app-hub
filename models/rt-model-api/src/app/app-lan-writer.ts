import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class AppLanWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppLan = src

    _.v(
      d,
      'languageItems',
      c.m('res.LanguageItem[]', s, 'getAllPSLanguageItems'),
    );
    _.w(d, 'language', s);

    super.onFillDSL(c, s, d);
  }
}
