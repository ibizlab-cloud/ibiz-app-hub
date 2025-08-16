import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { TextAreaWriter } from './text-area-writer';

export class CodeWriter extends TextAreaWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSCode = src

    _.w(d, 'codeType', s);
    _.w(d, 'enableFullScreen', s);
    _.w(d, 'enableMinimap', s);

    super.onFillDSL(c, s, d);
  }
}
