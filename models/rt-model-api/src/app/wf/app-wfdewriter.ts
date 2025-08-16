import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppWFDEWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppWFDE = src

    _.w(d, 'entityWFState', s);
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.x(d, 'appWFId', s, 'getPSAppWF');
    _.x(d, 'wfstateAppDEFieldId', s, 'getWFStatePSAppDEField');

    super.onFillDSL(c, s, d);
  }
}
