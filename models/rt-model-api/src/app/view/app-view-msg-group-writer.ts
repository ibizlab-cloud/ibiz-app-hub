import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppViewMsgGroupWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppViewMsgGroup = src

    _.w(d, 'bodyStyle', s);
    _.w(d, 'bottomStyle', s);
    _.w(d, 'codeName', s);
    _.v(
      d,
      'appViewMsgGroupDetails',
      c.m('app.view.AppViewMsgGroupDetail[]', s, 'getPSAppViewMsgGroupDetails'),
    );
    _.w(d, 'topStyle', s);

    super.onFillDSL(c, s, d);
  }
}
