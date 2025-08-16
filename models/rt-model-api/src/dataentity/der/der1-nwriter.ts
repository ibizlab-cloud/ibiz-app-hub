import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DERBaseWriter } from './derbase-writer';

export class DER1NWriter extends DERBaseWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDER1N = src

    _.w(d, 'cloneOrder', s);
    _.w(d, 'customExportOrder', s);
    _.w(d, 'customExportOrder2', s);
    _.w(d, 'exportMajorModel', s);
    _.w(d, 'masterOrder', s);
    _.w(d, 'masterRS', s);
    _.w(d, 'pickupDEFName', s);
    _.w(d, 'rrmlanResTag', s, 'rRMLanResTag');
    _.v(
      d,
      'rrmlanguageRes',
      c.s('res.LanguageRes[]', s, 'getRRMPSLanguageRes'),
    );
    _.w(d, 'removeActionType', s);
    _.w(d, 'removeOrder', s);
    _.w(d, 'removeRejectMsg', s);
    _.w(d, 'tempDataOrder', s);
    _.w(d, 'cloneRS', s);
    _.w(d, 'enableDEFieldWriteBack', s);
    _.w(d, 'enableExtRestrict', s);
    _.w(d, 'enablePDEREQ', s);
    _.w(d, 'enablePhysicalDEFieldUpdate', s);
    _.w(d, 'nestedRS', s);
    _.w(d, 'recursiveRS', s);

    super.onFillDSL(c, s, d);
  }
}
