import { IModelDSLGenEngineContext } from '../../../imodel-dslgen-engine-context';
import { DEFVRConditionWriter } from './defvrcondition-writer';

export class DEFVRSingleConditionWriter extends DEFVRConditionWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFVRSingleCondition = src

    _.w(d, 'defname', s, 'dEFName');

    super.onFillDSL(c, s, d);
  }
}
