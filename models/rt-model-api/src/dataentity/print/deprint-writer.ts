import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEPrintWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEPrint = src

    _.w(d, 'codeName', s);
    _.w(d, 'contentType', s);
    _.w(d, 'dataAccessAction', s);
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'printTag', s);
    _.w(d, 'printTag2', s);
    _.w(d, 'reportType', s);
    _.w(d, 'defaultMode', s);
    _.w(d, 'enableMulitPrint', s);

    super.onFillDSL(c, s, d);
  }
}
