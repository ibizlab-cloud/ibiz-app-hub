import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { NumberEditorWriter } from './number-editor-writer';

export class StepperWriter extends NumberEditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSStepper = src

    _.w(d, 'stepValue', s);

    super.onFillDSL(c, s, d);
  }
}
