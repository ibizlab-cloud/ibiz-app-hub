import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppViewEngineWriterBase extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppViewEngine = src

    _.v(d, 'params', c.m('view.UIEngineParam[]', s, 'getPSUIEngineParams'));

    super.onFillDSL(c, s, d);
  }
}
