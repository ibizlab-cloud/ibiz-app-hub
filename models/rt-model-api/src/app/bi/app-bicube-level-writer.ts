import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppBICubeLevelWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppBICubeLevel = src

    _.w(d, 'aggCaption', s);
    _.w(d, 'levelTag', s);
    _.w(d, 'levelTag2', s);
    _.w(d, 'levelType', s, '', 'COMMON');
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.w(d, 'textItemName', s);
    _.w(d, 'uniqueMembers', s);

    super.onFillDSL(c, s, d);
  }
}
