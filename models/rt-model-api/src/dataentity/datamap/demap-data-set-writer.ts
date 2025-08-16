import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEMapDataSetWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMapDataSet = src

    _.x(d, 'dstAppDEDataSetId', s, 'getDstPSAppDEDataSet');
    _.x(d, 'srcAppDEDataSetId', s, 'getSrcPSAppDEDataSet');

    super.onFillDSL(c, s, d);
  }
}
