import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class AppUtilPageWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppUtilPage = src

    _.x(d, 'appViewId', s, 'getPSAppView');
    _.w(d, 'pageUrl', s);
    _.w(d, 'targetType', s);
    _.w(d, 'utilParams', s);
    _.w(d, 'utilTag', s);
    _.w(d, 'utilType', s);

    super.onFillDSL(c, s, d);
  }
}
