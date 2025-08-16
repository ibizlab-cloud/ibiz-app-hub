import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEOPPrivWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEOPPriv = src

    _.w(d, 'logicName', s);
    _.w(d, 'mapDEName', s, 'mapPSDEName');
    _.w(d, 'mapDEOPPrivName', s, 'mapPSDEOPPrivName');
    _.w(d, 'mapSysUniResCode', s);
    _.w(d, 'mapSysUniResMode', s, 'mapSysUniRes');

    super.onFillDSL(c, s, d);
  }
}
