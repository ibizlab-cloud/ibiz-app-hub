import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicLinkCondWriter } from './deuilogic-link-cond-writer';

export class DEUILogicLinkSingleCondWriter extends DEUILogicLinkCondWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUILogicLinkSingleCond = src

    _.w(d, 'condOP', s);
    _.w(d, 'dstFieldName', s);
    _.x(d, 'dstLogicParamId', s, 'getDstLogicParam');
    _.w(d, 'paramType', s);
    _.w(d, 'paramValue', s);
    _.x(d, 'srcLogicParamId', s, 'getSrcLogicParam');
    _.w(d, 'value', s);

    super.onFillDSL(c, s, d);
  }
}
