import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppDEMethodReturnWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMethodReturn = src

    _.x(d, 'appDEMethodDTOId', s, 'getPSAppDEMethodDTO');
    _.w(d, 'stdDataType', s, '', 0);
    _.w(d, 'type', s);

    super.onFillDSL(c, s, d);
  }
}
