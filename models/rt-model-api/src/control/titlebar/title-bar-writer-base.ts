import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlContainerWriter } from '../control-container-writer';

export class TitleBarWriterBase extends ControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSTitleBar = src

    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);

    super.onFillDSL(c, s, d);
  }
}
