import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppDEMethodDTOFieldWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMethodDTOField = src

    _.w(d, 'codeName', s);
    _.w(d, 'jsonFormat', s);
    _.w(d, 'logicName', s);
    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');
    _.x(d, 'refAppDEDataSetId', s, 'getRefPSAppDEDataSet');
    _.x(d, 'refAppDEMethodDTOId', s, 'getRefPSAppDEMethodDTO');
    _.x(d, 'refAppDataEntityId', s, 'getRefPSAppDataEntity');
    _.x(d, 'refPickupAppDEFieldId', s, 'getRefPickupPSAppDEField');
    _.w(d, 'sourceType', s);
    _.w(d, 'stdDataType', s, '', 0);
    _.w(d, 'type', s);
    _.w(d, 'allowEmpty', s, '', true);
    _.w(d, 'listMap', s);

    super.onFillDSL(c, s, d);
  }
}
