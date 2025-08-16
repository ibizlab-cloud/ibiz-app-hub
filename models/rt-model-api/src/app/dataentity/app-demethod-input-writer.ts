import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppDEMethodInputWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMethodInput = src

    _.x(d, 'keyAppDEFieldId', s, 'getKeyPSAppDEField');
    _.x(d, 'appDEMethodDTOId', s, 'getPSAppDEMethodDTO');
    _.w(d, 'type', s);
    _.w(d, 'output', s);

    super.onFillDSL(c, s, d);
  }
}
