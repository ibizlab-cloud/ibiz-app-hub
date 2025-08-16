import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysSearchBarItemWriterBase } from './sys-search-bar-item-writer-base';

export class SysSearchBarGroupWriter extends SysSearchBarItemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSearchBarGroup = src

    _.v(
      d,
      'filterDEDQConditions',
      c.m('dataentity.ds.DEDQCondition[]', s, 'getFilterPSDEDQConditions'),
    );
    _.w(d, 'tooltip', s);
    _.v(
      d,
      'tooltipLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTooltipPSLanguageRes'),
    );
    _.w(d, 'width', s);
    _.w(d, 'addSeparator', s);
    _.w(d, 'defaultGroup', s);

    super.onFillDSL(c, s, d);
  }
}
