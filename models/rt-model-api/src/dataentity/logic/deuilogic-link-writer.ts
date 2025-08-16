import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEUILogicLinkWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUILogicLink = src

    _.x(d, 'dstDEUILogicNodeId', s, 'getDstPSDEUILogicNode');
    _.w(d, 'linkCond', s);
    _.w(d, 'linkMode', s);
    _.v(
      d,
      'deuilogicLinkGroupCond',
      c.s(
        'dataentity.logic.DEUILogicLinkGroupCond[]',
        s,
        'getPSDEUILogicLinkGroupCond',
      ),
    );
    _.x(d, 'srcDEUILogicNodeId', s, 'getSrcPSDEUILogicNode');
    _.w(d, 'catchLink', s);
    _.w(d, 'defaultLink', s);
    _.w(d, 'fulfilledLink', s);
    _.w(d, 'rejectedLink', s);
    _.w(d, 'subCallLink', s);

    super.onFillDSL(c, s, d);
  }
}
