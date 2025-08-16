import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem, ISysImage } from '@ibiz/model-core';
import { isNil, reject } from 'ramda';
import { nextTick } from 'vue';
import { NavPosIndexController } from '../nav-pos-index';
import { NavTabsState, TabMsg } from './nav-tabs.state';

/**
 * 导航占位控制器
 *
 * @export
 * @class NavTabsController
 * @extends {PanelItemController}
 */
export class NavTabsController extends PanelItemController<IPanelRawItem> {
  declare state: NavTabsState;

  protected createState(): NavTabsState {
    return new NavTabsState(this.parent?.state);
  }

  /**
   * @description 当前视图的路由层级，非路由模式不存在。
   * @exposedoc
   * @readonly
   */
  get routeDepth(): number | undefined {
    return this.panel.view.modal.routeDepth;
  }

  /**
   * @description 导航占位控制器
   * @exposedoc
   * @readonly
   * @type {(NavPosIndexController | undefined)}
   */
  get navPos(): NavPosIndexController | undefined {
    return this.panel.panelItems.nav_pos_index as NavPosIndexController;
  }

  /**
   * @description 获取tabItem
   * @exposedoc
   * @param {string} key
   * @return {*}
   */
  findTabItem(key: string): TabMsg | undefined {
    return this.state.tabItems.find(item => item.key === key);
  }

  /**
   * @description 通过视图标识获取tabItem
   * @exposedoc
   * @param {string} key
   * @return {*}  {(TabMsg | undefined)}
   * @memberof NavTabsController
   */
  findTabItemByViewKey(key: string): TabMsg | undefined {
    return this.state.tabItems.find(item => item.viewKey === key);
  }

  /**
   * 点击处理
   * @author lxm
   * @date 2023-05-25 01:31:04
   * @param {string} key
   */
  onTabClick(key: string): void {
    this.navPos?.changeView(key);
  }

  /**
   * 更新视图信息
   *
   * @param {string} key
   * @param {{
   *       viewKey: string;
   *       caption?: string;
   *       dataInfo?: string;
   *       sysImage?: ISysImage;
   *     }} info
   * @memberof NavTabsController
   */
  updateViewInfo(
    key: string,
    info: {
      viewKey?: string;
      caption?: string;
      dataInfo?: string;
      sysImage?: ISysImage;
    },
  ): void {
    const findItem = info.viewKey
      ? this.findTabItemByViewKey(info.viewKey)
      : this.findTabItem(key);
    if (findItem) {
      Object.assign(findItem, reject(isNil, info));
      this.refreshItemUI(key);
    } else {
      this.state.tabItems.push({ key, ...info });
      this.state.activeTab = this.state.currentKey;
    }
  }

  /**
   * @description 删除某个key对应的数据，仅处理组件自身维护的数据
   * @exposedoc
   * @param {string} key
   */
  removeCache(key: string): void {
    const findIndex = this.state.tabItems.findIndex(item => item.key === key);
    if (findIndex !== -1) {
      this.state.tabItems.splice(findIndex, 1);
    }
  }

  /**
   * @description 删除分页
   * @exposedoc
   * @param {string} key
   */
  onTabRemove(key: string): void {
    this.navPos?.closeViewByKeys([key]);
  }

  /**
   * 删除其他所有的标签页
   * @author lxm
   * @date 2023-05-09 02:19:55
   */
  removeOther(): void {
    const currentKey = this.state.currentKey;
    const removeKeys: string[] = [];
    this.state.tabItems.forEach(item => {
      if (item.key !== currentKey) {
        removeKeys.push(item.key);
      }
    });
    if (removeKeys.length > 0) {
      this.navPos?.closeViewByKeys(removeKeys);
    }
  }

  /**
   * @description 删除所有的标签页
   * @exposedoc
   * @author lxm
   * @date 2023-05-09 02:50:01
   */
  removeAll(): void {
    const removeKeys: string[] = this.state.tabItems.map(item => item.key);
    if (removeKeys.length > 0) {
      this.navPos?.closeViewByKeys(removeKeys);
    }
  }

  /**
   * @description 刷新项（解决主信息更新之后界面ui未刷新）
   * @exposedoc
   * @param {string} key
   * @memberof NavTabsController
   */
  public refreshItemUI(key: string): void {
    const tempItem = {
      key: 'exampleItem',
      caption: '',
    };
    this.state.tabItems.push(tempItem);
    this.state.activeTab = tempItem.key;
    nextTick(() => {
      this.state.tabItems.pop();
      this.state.activeTab = key;
    });
  }
}
