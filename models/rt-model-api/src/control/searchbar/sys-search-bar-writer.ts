import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlContainerWriter } from '../control-container-writer';

export class SysSearchBarWriter extends ControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysSearchBar = src

    _.w(d, 'groupMode', s, '', 'SINGLE');
    _.w(d, 'groupMoreText', s);
    _.x(d, 'appCounterRefId', s, 'getPSAppCounterRef');
    _.v(
      d,
      'searchBarFilters',
      c.m('control.searchbar.SearchBarFilter[]', s, 'getPSSearchBarFilters'),
    );
    _.v(
      d,
      'searchBarGroups',
      c.m('control.searchbar.SearchBarGroup[]', s, 'getPSSearchBarGroups'),
    );
    _.v(
      d,
      'searchBarQuickSearchs',
      c.m(
        'control.searchbar.SearchBarQuickSearch[]',
        s,
        'getPSSearchBarQuickSearchs',
      ),
    );
    _.w(d, 'quickGroupCount', s);
    _.w(d, 'quickSearchMode', s);
    _.w(d, 'quickSearchWidth', s);
    _.w(d, 'searchBarStyle', s);
    _.w(d, 'enableFilter', s);
    _.w(d, 'enableGroup', s);
    _.w(d, 'enableQuickSearch', s);
    _.w(d, 'mobileSearchBar', s);

    super.onFillDSL(c, s, d);
  }
}
