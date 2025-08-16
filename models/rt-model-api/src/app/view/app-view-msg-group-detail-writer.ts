import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppViewMsgGroupDetailWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppViewMsgGroupDetail = src

    _.x(d, 'appViewMsgId', s, 'getPSAppViewMsg');
    _.w(d, 'position', s);

    super.onFillDSL(c, s, d);
  }
}
