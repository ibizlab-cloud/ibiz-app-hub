import { IMapData, INavViewMsg, MapController } from '@ibiz-template/runtime';
import { ISysMap } from '@ibiz/model-core';
import { NavgationBaseProvider } from './navigation-base.provider';

/**
 * 地图导航适配器
 *
 * @export
 * @class MapNavigationProvider
 * @extends {NavgationBaseProvider}
 */
export class MapNavigationProvider extends NavgationBaseProvider {
  keyName = 'id';

  declare controller: MapController;

  declare model: ISysMap;

  onNavDataByStack(): void {
    const { items } = this.controller.state;
    const navData =
      this.navStack
        .map(key => items.find(item => item._id === key))
        .find(item => item !== undefined) || items[0];
    if (navData) {
      this.controller.setNavData(navData);
    } else {
      this.navStack = [];
      this.navViewMsg.value = undefined;
    }
  }

  getNavViewMsg(item: IMapData): INavViewMsg {
    const { sysMapItems } = this.model;
    const itemModel = sysMapItems?.find(_item => _item.id === item._mapItemId);
    if (itemModel) {
      const { context, params } = this.prepareParams(
        itemModel,
        item._deData,
        this.controller.context,
        this.controller.params,
      );
      return {
        params,
        context,
        key: item._id,
        viewId: itemModel.navAppViewId,
      };
    }
    return {
      key: item._id,
      context: this.controller.context,
      params: this.controller.params,
    };
  }
}
