import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEMapDetailWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEMapField = src

    _.w(d, 'dstFieldName', s);
    _.w(d, 'expression', s);
    _.w(d, 'mapType', s);
    _.w(d, 'rawValue', s);
    _.w(d, 'srcFieldName', s);

    //let iPSAppDEMapField = src

    _.x(d, 'dstAppDEFieldId', s, 'getDstPSAppDEField');
    _.x(d, 'srcAppDEFieldId', s, 'getSrcPSAppDEField');

    super.onFillDSL(c, s, d);
  }
}
