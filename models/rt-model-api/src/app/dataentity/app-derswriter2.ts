import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppDERSWriter2 extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDERS = src

    _.w(d, 'actionRSMode', s);
    _.w(d, 'codeName', s);
    _.w(d, 'codeName2', s);
    _.w(d, 'dataRSMode', s);
    _.x(d, 'majorAppDataEntityId', s, 'getMajorPSAppDataEntity');
    _.x(d, 'nestedAppDEDataSetId', s, 'getNestedPSAppDEDataSet');
    _.w(d, 'parentFilter', s);
    _.x(d, 'parentAppDEFieldId', s, 'getParentPSAppDEField');
    _.x(d, 'parentTextAppDEFieldId', s, 'getParentTextPSAppDEField');
    _.w(d, 'rrmlanResTag', s, 'rRMLanResTag');
    _.w(d, 'rsmode', s, 'rSMode');
    _.w(d, 'rstype', s, 'rSType');
    _.w(d, 'removeActionType', s);
    _.w(d, 'removeOrder', s, '', 0);
    _.w(d, 'removeRejectMsg', s);
    _.w(d, 'tempDataOrder', s);
    _.w(d, 'enableCreateDataRS', s);
    _.w(d, 'enableGetDataRS', s);
    _.w(d, 'enableSelectDataRS', s);
    _.w(d, 'enableUpdateDataRS', s);

    super.onFillDSL(c, s, d);
  }
}
