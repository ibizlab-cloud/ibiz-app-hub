import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DELogicNodeWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDELogicNode = src

    _.w(d, 'codeName', s);
    _.w(d, 'height', s, '', 0);
    _.w(d, 'leftPos', s, '', 0);
    _.w(d, 'logicNodeType', s);
    _.w(d, 'nodeParams', s);
    _.v(
      d,
      'links',
      c.m('dataentity.logic.DELogicLink[]', s, 'getPSDELogicLinks'),
    );
    _.v(
      d,
      'delogicNodeParams',
      c.m('dataentity.logic.DELogicNodeParam[]', s, 'getPSDELogicNodeParams'),
    );
    _.w(d, 'topPos', s, '', 0);
    _.w(d, 'width', s, '', 0);
    _.w(d, 'parallelOutput', s);

    super.onFillDSL(c, s, d);
  }
}
