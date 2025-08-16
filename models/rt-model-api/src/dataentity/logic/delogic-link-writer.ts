import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DELogicLinkWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDELogicLink = src

    _.x(d, 'thenId', s, 'getDstPSDELogicNode');
    _.v(
      d,
      'delogicLinkGroupCond',
      c.s(
        'dataentity.logic.DELogicLinkGroupCond[]',
        s,
        'getPSDELogicLinkGroupCond',
      ),
    );
    _.w(d, 'catchLink', s);
    _.w(d, 'defaultLink', s);
    _.w(d, 'subCallLink', s);

    super.onFillDSL(c, s, d);
  }
}
