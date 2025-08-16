import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEUILogicWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUILogic = src

    _.w(d, 'codeName', s);
    _.w(d, 'defaultParamName', s);
    _.w(d, 'logicName', s);
    _.v(
      d,
      'deuilogicNodes',
      c.m('dataentity.logic.DEUILogicNode[]', s, 'getPSDEUILogicNodes'),
    );
    _.v(
      d,
      'deuilogicParams',
      c.m('dataentity.logic.DEUILogicParam[]', s, 'getPSDEUILogicParams'),
    );
    _.x(d, 'startDEUILogicNodeId', s, 'getStartPSDEUILogicNode');

    super.onFillDSL(c, s, d);
  }
}
