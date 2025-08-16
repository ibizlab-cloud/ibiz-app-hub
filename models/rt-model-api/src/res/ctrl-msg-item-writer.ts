import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class CtrlMsgItemWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSCtrlMsgItem = src

    _.w(d, 'content', s);
    _.v(
      d,
      'contentLanguageRes',
      c.s('res.LanguageRes[]', s, 'getContentPSLanguageRes'),
    );
    _.w(d, 'timeout', s);

    super.onFillDSL(c, s, d);
  }
}
