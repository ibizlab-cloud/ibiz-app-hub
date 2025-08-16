import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class CtrlMsgWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSCtrlMsg = src

    _.w(d, 'codeName', s);
    _.w(d, 'msgModel', s);
    _.v(d, 'ctrlMsgItems', c.m('res.CtrlMsgItem[]', s, 'getPSCtrlMsgItems'));

    super.onFillDSL(c, s, d);
  }
}
