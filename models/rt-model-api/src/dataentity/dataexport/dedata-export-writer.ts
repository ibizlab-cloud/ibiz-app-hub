import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEDataExportWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDataExport = src

    _.w(d, 'codeName', s);
    _.w(d, 'contentType', s);
    _.w(d, 'expTag', s);
    _.w(d, 'expTag2', s);
    _.w(d, 'maxRowCount', s);
    _.v(
      d,
      'dedataExportItems',
      c.m(
        'dataentity.dataexport.DEDataExportItem[]',
        s,
        'getPSDEDataExportItems',
      ),
    );
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'defaultMode', s);
    _.w(d, 'enableBackend', s);
    _.w(d, 'enableCustomized', s);
    _.w(d, 'enableFront', s);
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');

    super.onFillDSL(c, s, d);
  }
}
