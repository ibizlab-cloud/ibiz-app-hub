import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEMapActionWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMapAction = src

    _.x(d, 'dstAppDEActionId', s, 'getDstPSAppDEAction');
    _.x(d, 'srcAppDEActionId', s, 'getSrcPSAppDEAction');

    super.onFillDSL(c, s, d);
  }
}
