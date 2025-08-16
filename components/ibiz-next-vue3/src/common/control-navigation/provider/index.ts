import { MDControlController } from '@ibiz-template/runtime';
import { NavgationBaseProvider } from './navigation-base.provider';
import { CalendarNavigationProvider } from './calendar-navigation.provider';
import { TreeNavigationProvider } from './tree-navigation.provider';
import { MapNavigationProvider } from './map-navigation.provider';

/**
 * 获取部件导航适配器
 *
 * @export
 * @param {MDControlController} controller
 * @return {*}  {NavgationBaseProvider}
 */
export function getNavigationProvider(
  controller: MDControlController,
): NavgationBaseProvider {
  const { controlType } = controller.model;
  if (controlType === 'CALENDAR')
    return new CalendarNavigationProvider(controller);
  if (controlType === 'TREEVIEW') return new TreeNavigationProvider(controller);
  if (controlType === 'MAP') return new MapNavigationProvider(controller);
  return new NavgationBaseProvider(controller);
}
