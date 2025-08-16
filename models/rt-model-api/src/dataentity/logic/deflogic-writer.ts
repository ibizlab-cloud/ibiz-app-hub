import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicWriter } from './delogic-writer';

export class DEFLogicWriter extends DELogicWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFLogic = src

    _.w(d, 'deflogicMode', s, 'dEFLogicMode');

    //let iPSAppDEFLogic = src

    _.x(d, 'appDEFieldId', s, 'getPSAppDEField');

    super.onFillDSL(c, s, d);
  }
}
