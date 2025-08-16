import { ControlType, registerControlProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { SearchBarControl } from './search-bar';
import { FilterTreeControl } from './filter-tree/filter-tree';
import { SearchBarProvider } from './search-bar.provider';
import { FilterModeSelect } from './filter-mode-select/filter-mode-select';
import { FilterFieldSelect } from './filter-field-select/filter-field-select';

export * from './search-bar.provider';

export const IBizSearchBarControl = withInstall(
  SearchBarControl,
  function (v: App) {
    v.component(SearchBarControl.name, SearchBarControl);
    v.component(FilterTreeControl.name, FilterTreeControl);
    v.component(FilterModeSelect.name, FilterModeSelect);
    v.component(FilterFieldSelect.name, FilterFieldSelect);
    registerControlProvider(
      ControlType.SEARCHBAR,
      () => new SearchBarProvider(),
    );
  },
);

export default IBizSearchBarControl;
