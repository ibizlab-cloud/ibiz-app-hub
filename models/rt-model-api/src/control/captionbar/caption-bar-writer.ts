import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlWriter } from '../control-writer';

export class CaptionBarWriter extends ControlWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSCaptionBar = src

    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.v(
      d,
      'subCapLanguageRes',
      c.s('res.LanguageRes[]', s, 'getSubCapPSLanguageRes'),
    );
    _.w(d, 'subCaption', s);

    super.onFillDSL(c, s, d);
  }
}
