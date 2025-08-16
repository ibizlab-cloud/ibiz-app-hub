import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicNodeWriter } from './delogic-node-writer';

export class DEStartWFLogicWriter extends DELogicNodeWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEStartWFLogic = src

    _.x(d, 'dstDELogicParamId', s, 'getDstPSDELogicParam');
    _.x(d, 'optDELogicParamId', s, 'getOptPSDELogicParam');
    _.x(d, 'appWFId', s, 'getPSAppWF');
    _.x(d, 'retDELogicParamId', s, 'getRetPSDELogicParam');

    super.onFillDSL(c, s, d);
  }
}
