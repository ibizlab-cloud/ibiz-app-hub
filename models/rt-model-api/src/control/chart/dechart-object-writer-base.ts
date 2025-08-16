import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEChartObjectWriterBase extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartObject = src

    _.w(d, 'index', s);

    super.onFillDSL(c, s, d);
  }
}
