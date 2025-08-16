import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class AppMethodDTOFieldWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppMethodDTOField = src

    _.w(d, 'codeName', s);
    _.w(d, 'jsonFormat', s);
    _.w(d, 'logicName', s);
    _.x(d, 'refAppDEMethodDTOId', s, 'getRefPSAppDEMethodDTO');
    _.x(d, 'refAppDataEntityId', s, 'getRefPSAppDataEntity');
    _.x(d, 'refAppMethodDTOId', s, 'getRefPSAppMethodDTO');
    _.w(d, 'sourceType', s);
    _.w(d, 'stdDataType', s, '', 0);
    _.w(d, 'type', s);
    _.w(d, 'allowEmpty', s, '', true);

    super.onFillDSL(c, s, d);
  }
}
