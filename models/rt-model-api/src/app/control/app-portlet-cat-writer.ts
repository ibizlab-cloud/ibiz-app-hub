import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppPortletCatWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppPortletCat = src

    _.w(d, 'codeName', s);
    _.v(
      d,
      'nameLanguageRes',
      c.s('res.LanguageRes[]', s, 'getNamePSLanguageRes'),
    );
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.w(d, 'ungroup', s);

    super.onFillDSL(c, s, d);
  }
}
