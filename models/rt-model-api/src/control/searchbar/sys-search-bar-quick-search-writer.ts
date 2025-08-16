import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { SysSearchBarItemWriterBase } from './sys-search-bar-item-writer-base';

export class SysSearchBarQuickSearchWriter extends SysSearchBarItemWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSearchBarQuickSearch = src

    _.v(
      d,
      'defsearchMode',
      c.s('dataentity.defield.DEFSearchMode[]', s, 'getPSDEFSearchMode'),
    );

    super.onFillDSL(c, s, d);
  }
}
