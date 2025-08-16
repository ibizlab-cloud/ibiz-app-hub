import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicLinkCondWriter } from './delogic-link-cond-writer';

export class DELogicLinkSingleCondWriter extends DELogicLinkCondWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDELogicLinkSingleCond = src

    _.w(d, 'condOP', s);
    _.w(d, 'dstFieldName', s);
    _.x(d, 'dstLogicParamId', s, 'getDstLogicParam');
    _.w(d, 'paramType', s);
    _.w(d, 'paramValue', s);
    _.x(d, 'srcLogicParamId', s, 'getSrcLogicParam');

    super.onFillDSL(c, s, d);
  }
}
