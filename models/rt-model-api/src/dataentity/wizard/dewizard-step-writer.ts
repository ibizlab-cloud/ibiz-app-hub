import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEWizardStepWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEWizardStep = src

    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.w(d, 'stepTag', s);
    _.w(d, 'subTitle', s);
    _.v(
      d,
      'subTitleLanguageRes',
      c.s('res.LanguageRes[]', s, 'getSubTitlePSLanguageRes'),
    );
    _.w(d, 'title', s);
    _.v(
      d,
      'titleLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTitlePSLanguageRes'),
    );
    _.v(d, 'titleSysCss', c.s('res.SysCss[]', s, 'getTitlePSSysCss'));
    _.w(d, 'enableLink', s);

    super.onFillDSL(c, s, d);
  }
}
