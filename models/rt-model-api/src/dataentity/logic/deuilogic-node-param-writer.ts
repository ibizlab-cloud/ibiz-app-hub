import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEUILogicNodeParamWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUILogicNodeParam = src

    _.w(d, 'aggMode', s);
    _.w(d, 'dstFieldName', s);
    _.w(d, 'dstIndex', s);
    _.x(d, 'dstDEUILogicParamId', s, 'getDstPSDEUILogicParam');
    _.w(d, 'dstSortDir', s);
    _.w(d, 'expression', s);
    _.w(d, 'paramAction', s);
    _.w(d, 'srcFieldName', s);
    _.w(d, 'srcIndex', s);
    _.x(d, 'srcDEUILogicParamId', s, 'getSrcPSDEUILogicParam');
    _.w(d, 'srcSize', s);
    _.w(d, 'srcValue', s);
    _.w(d, 'srcValueStdDataType', s, '', 0);
    _.w(d, 'srcValueType', s);

    super.onFillDSL(c, s, d);
  }
}
