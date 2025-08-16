import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DELogicLinkCondWriter } from './delogic-link-cond-writer';

export class DELogicLinkGroupCondWriter extends DELogicLinkCondWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDELogicLinkGroupCond = src

    _.w(d, 'groupOP', s);
    _.v(
      d,
      'conds',
      c.m('dataentity.logic.DELogicLinkCond[]', s, 'getPSDELogicLinkConds'),
    );
    _.w(d, 'notMode', s);

    super.onFillDSL(c, s, d);
  }
}
