import { RuntimeModelError } from '@ibiz-template/core';
import {
  ViewController,
  IMPickupViewState,
  IMPickupViewEvent,
  SysUIActionTag,
  IListController,
  IApiMPickupViewCall,
} from '@ibiz-template/runtime';
import { IAppDEPickupView } from '@ibiz/model-core';
import { PickupViewEngine } from './pickup-view.engine';

/**
 * 多数据选择视图引擎
 *
 * @author zk
 * @date 2023-05-25 03:05:17
 * @export
 * @class MPickupViewEngine
 * @extends {ViewEngineBase}
 */
export class MPickupViewEngine extends PickupViewEngine {
  protected declare view: ViewController<
    IAppDEPickupView,
    IMPickupViewState,
    IMPickupViewEvent
  >;

  /**
   * 简单列表控制器
   *
   * @author zk
   * @date 2023-05-26 03:05:43
   * @readonly
   * @memberof MPickupViewEngine
   */
  get simpleList(): IListController {
    return this.view.getController('simplelist') as IListController;
  }

  /**
   * 视图created生命周期执行逻辑
   *
   * @author zk
   * @date 2023-05-26 05:05:36
   * @return {*}  {Promise<void>}
   * @memberof MPickupViewEngine
   */
  async onCreated(): Promise<void> {
    await super.onCreated();
    if (!this.view.providers.simplelist) {
      throw new RuntimeModelError(
        this.view.model,
        ibiz.i18n.t('viewEngine.missingConfigErr'),
      );
    }

    const { childNames } = this.view;
    childNames.push('simplelist');
    // 设置回显selectedData
    if (this.view.params.selecteddata) {
      this.selectData = JSON.parse(this.view.params.selecteddata);
      delete this.view.params.selecteddata;
    }
    if (!this.view.slotProps.simplelist) {
      this.view.slotProps.simplelist = {};
    }
    if (!this.view.slotProps.pickupviewpanel) {
      this.view.slotProps.pickupviewpanel = {};
    }
    this.view.slotProps.simplelist.mdctrlActiveMode = 2;
    this.view.slotProps.simplelist.isSimple = true;
    this.view.slotProps.simplelist.singleSelect = false;
    this.view.slotProps.pickupviewpanel.singleSelect = false;
  }

  /**
   * 视图mounted生命周期执行逻辑
   *
   * @author zk
   * @date 2023-05-26 05:05:27
   * @return {*}  {Promise<void>}
   * @memberof MPickupViewEngine
   */
  async onMounted(): Promise<void> {
    await super.onMounted();
    // 列表激活取消选中
    this.simpleList.evt.on('onActive', event => {
      this.simpleListActive(event.data);
    });
    // 默认回显选中数据
    this.simpleList.setData(this.selectData);
  }

  async call(
    key: keyof IApiMPickupViewCall,
    args: IData | undefined,
  ): Promise<IData | null | undefined> {
    if (key === SysUIActionTag.CANCEL) {
      this.cancel();
      return null;
    }
    if (key === SysUIActionTag.OK) {
      this.confirm();
      return null;
    }
    if (key === SysUIActionTag.ADD_SELECTION) {
      this.addSelection();
      return null;
    }
    if (key === SysUIActionTag.ADD_ALL) {
      this.addAll();
      return null;
    }
    if (key === SysUIActionTag.REMOVE_ALL) {
      this.removeAll();
      return null;
    }
    if (key === SysUIActionTag.REMOVE_SELECTION) {
      this.removeSelection();
      return null;
    }
    return super.call(key, args);
  }

  /**
   *  选则面板激活数据
   *
   * @author zk
   * @date 2023-05-26 05:05:13
   * @param {*} data
   * @memberof PickupViewEngine
   */
  protected pickupViewPanelDataActive(data: IData[]): void {
    this.handlePushSimpleListItems(data);
  }

  /**
   * 列表激活
   *
   * @author zk
   * @date 2023-05-26 05:05:47
   * @param {IData[]} data
   * @memberof MPickupViewEngine
   */
  protected simpleListActive(data: IData[]): void {
    const items = this.simpleList.getAllData();
    data.forEach(item => {
      const index = items.findIndex(_item => _item.srfkey === item.srfkey);
      if (index !== -1) {
        items.splice(index, 1);
      }
    });
    this.simpleList.setData(items);
  }

  /**
   * 添加选中
   *
   * @author zk
   * @date 2023-05-25 05:05:10
   * @memberof MPickupViewEngine
   */
  async addSelection(): Promise<void> {
    const selectItem = await this.pickupViewPanel.getSelectedData();
    this.handlePushSimpleListItems(selectItem);
  }

  /**
   * 处理添加简单列表数据
   *
   * @author zk
   * @date 2023-05-26 02:05:41
   * @param {IData[]} data
   * @memberof MPickupViewEngine
   */
  protected handlePushSimpleListItems(data: IData[]): void {
    const allData = this.simpleList.getAllData();
    const items = [...allData, ...data];
    // 去重items
    const uniqueItems = this.handleUniqueItems(items);
    this.simpleList.setData(uniqueItems);
  }

  /**
   * 去重数组
   *
   * @author zk
   * @date 2023-05-26 03:05:08
   * @param {IData[]} arr
   * @return {*}
   * @memberof MPickupViewEngine
   */
  protected handleUniqueItems(arr: IData[]): IData[] {
    const res = new Map();
    return arr.filter(
      (item: IData) => !res.has(item.srfkey) && res.set(item.srfkey, 1),
    );
  }

  /**
   * 添加所有
   *
   * @author zk
   * @date 2023-05-25 05:05:12
   * @memberof MPickupViewEngine
   */
  async addAll(): Promise<void> {
    const allItems = await this.pickupViewPanel.getAllData();
    this.handlePushSimpleListItems(allItems);
  }

  /**
   * 删除所有
   *
   * @author zk
   * @date 2023-05-25 05:05:14
   * @memberof MPickupViewEngine
   */
  removeAll(): void {
    this.simpleList.setData([]);
  }

  /**
   * 删除选中
   *
   * @author zk
   * @date 2023-05-25 05:05:16
   * @memberof MPickupViewEngine
   */
  protected removeSelection(): void {
    const selectData = this.simpleList.getData();
    const items = this.simpleList.getAllData();
    selectData.forEach((_item: IData) => {
      const index = items.findIndex(
        (item: IData) => _item.srfkey === item.srfkey,
      );
      if (index !== -1) {
        items.splice(index, 1);
      }
    });
    this.simpleList.setData(items);
  }

  /**
   * 提交
   *
   * @author zk
   * @date 2023-05-25 06:05:42
   * @memberof MPickupViewEngine
   */
  confirm(): void {
    const items = this.simpleList.getAllData();
    this.view.closeView({ ok: true, data: items });
  }
}
