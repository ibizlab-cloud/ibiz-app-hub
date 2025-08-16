import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEMapWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEMap = src

    _.w(d, 'codeName', s);
    _.w(d, 'logicName', s);
    _.w(d, 'valid', s, '', true);

    //let iPSAppDEMap = src

    _.x(d, 'dstAppDataEntityId', s, 'getDstPSAppDataEntity');

    super.onFillDSL(c, s, d);
  }
}
