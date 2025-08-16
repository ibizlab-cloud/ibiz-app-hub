import { IModelDSLGenEngineContext } from './imodel-dslgen-engine-context';
import { ModelWriterBase } from './model-writer-base';

export class ModelObjectWriter extends ModelWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    _.w(d, 'modelId', s, 'modelid');
    _.w(d, 'modelType', s, 'modeltype');

    super.onFillDSL(c, s, d);
  }
}
