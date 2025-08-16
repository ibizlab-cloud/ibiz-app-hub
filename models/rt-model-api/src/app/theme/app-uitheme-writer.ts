import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppUIThemeWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppUITheme = src

    _.w(d, 'cssStyle', s);
    _.w(d, 'themeDesc', s);
    _.w(d, 'themeParams', s);
    _.w(d, 'themeTag', s);
    _.w(d, 'themeUrl', s);

    super.onFillDSL(c, s, d);
  }
}
