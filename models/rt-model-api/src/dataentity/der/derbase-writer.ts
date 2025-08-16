import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DERBaseWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDERBase = src

    _.w(d, 'codeName', s);
    _.w(d, 'dertag', s, 'dERTag');
    _.w(d, 'dertag2', s, 'dERTag2');
    _.w(d, 'dertype', s, 'dERType');
    _.w(d, 'logicName', s);
    _.w(d, 'minorCodeName', s);
    _.w(d, 'minorLogicName', s);
    _.w(d, 'minorServiceCodeName', s);
    _.w(d, 'orderValue', s);
    _.w(d, 'serviceCodeName', s);

    super.onFillDSL(c, s, d);
  }
}
