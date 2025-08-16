import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEDataImportWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDataImport = src

    _.w(d, 'batchSize', s);
    _.w(d, 'codeName', s);
    _.w(d, 'createDataAccessAction', s);
    _.w(d, 'impTag', s);
    _.w(d, 'impTag2', s);
    _.v(
      d,
      'dedataImportItems',
      c.m(
        'dataentity.dataimport.DEDataImportItem[]',
        s,
        'getPSDEDataImportItems',
      ),
    );
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'updateDataAccessAction', s);
    _.w(d, 'defaultMode', s);
    _.w(d, 'enableBackend', s);
    _.w(d, 'enableCustomized', s);
    _.w(d, 'enableFront', s);
    _.w(d, 'ignoreError', s);
    _.w(d, 'valid', s, '', true);

    //let iPSAppDEDataImport = src

    _.x(d, 'createAppDEActionId', s, 'getCreatePSAppDEAction');
    _.x(d, 'updateAppDEActionId', s, 'getUpdatePSAppDEAction');

    super.onFillDSL(c, s, d);
  }
}
