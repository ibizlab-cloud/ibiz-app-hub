import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEUILogicLinkCondWriter } from './deuilogic-link-cond-writer';

export class DEUILogicLinkGroupCondWriter extends DEUILogicLinkCondWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUILogicLinkGroupCond = src

    _.w(d, 'groupOP', s);
    _.v(
      d,
      'deuilogicLinkConds',
      c.m('dataentity.logic.DEUILogicLinkCond[]', s, 'getPSDEUILogicLinkConds'),
    );
    _.w(d, 'notMode', s);

    super.onFillDSL(c, s, d);
  }
}
