import {
  ViewController,
  IPickupTreeViewState,
  IPickupTreeViewEvent,
  ViewCallTag,
  IApiPickupTreeViewCall,
} from '@ibiz-template/runtime';
import { IAppDETreeView } from '@ibiz/model-core';
import { TreeViewEngine } from './tree-view.engine';

export class PickupTreeViewEngine extends TreeViewEngine {
  protected declare view: ViewController<
    IAppDETreeView,
    IPickupTreeViewState,
    IPickupTreeViewEvent
  >;

  /**
   * 选中数据
   *
   * @type {IData[]}
   * @memberof PickupViewEngine
   */
  selectData: IData[] = [];

  /**
   * 通过srfkey选中数据
   * @author lxm
   * @date 2024-02-21 09:17:23
   * @type {boolean}
   */
  selectBySrfkey: boolean = false;

  /**
   * 创建完成
   *
   * @author zk
   * @date 2023-05-26 05:05:35
   * @memberof PickupGridViewEngine
   */
  async onCreated(): Promise<void> {
    super.onCreated();
    if (!this.view.slotProps.tree) {
      this.view.slotProps.tree = {};
    }
    this.view.slotProps.tree.singleSelect = this.view.state.singleSelect;
    this.view.slotProps.tree.checkStrictly = this.view.state.checkStrictly;
    // 设置回显selectedData
    if (this.view.state.selectedData) {
      this.selectData = this.view.state.selectedData.map((item: IData) => {
        return {
          ...item,
          _id: item.srfnodeid,
        };
      });
      const set = new Set();
      this.selectData.forEach(item => {
        if (item.srfnodeid) {
          const keys = this.calcExpandKeys(item.srfnodeid);
          keys.forEach(key => set.add(key));
        } else {
          this.selectBySrfkey = true;
        }
      });
      this.view.slotProps.tree.defaultExpandedKeys = Array.from(set);
    }
  }

  /**
   * 根据key计算需要展开的节点标识
   * @author lxm
   * @date 2023-11-07 02:42:45
   * @param {string} key
   * @return {*}  {string[]}
   */
  calcExpandKeys(key: string): string[] {
    const expandedKeys: string[] = [];
    key.split(':').forEach((item, index) => {
      if (index === 0) {
        expandedKeys.push(item);
      } else {
        expandedKeys.push(`${expandedKeys[index - 1]}:${item}`);
      }
    });
    expandedKeys.pop(); // 删除最后一个
    return expandedKeys;
  }

  /**
   * 挂载完成
   *
   * @author zk
   * @date 2023-05-26 10:05:13
   * @memberof PickupGridViewEngine
   */
  async onMounted(): Promise<void> {
    const { model } = this.view;
    let forbiddenSelectionChange = false;
    this.xdataControl.evt.on('onSelectionChange', async event => {
      if (forbiddenSelectionChange) {
        return;
      }
      this.view.evt.emit('onSelectionChange', { ...event });
    });
    this.xdataControl.evt.on('onActive', async event => {
      this.view.evt.emit('onDataActive', { ...event });
    });
    this.xdataControl.evt.on('onLoadSuccess', () => {
      forbiddenSelectionChange = true;
      let selectData = this.selectData;
      if (this.selectBySrfkey) {
        const srfkeys = this.selectData.map(item => item.srfkey);
        selectData = this.tree.state.items.filter(item => {
          return srfkeys.includes(item.srfkey);
        });
      }
      this.xdataControl.setSelection(selectData);
      forbiddenSelectionChange = false;
    });

    // 默认加载
    if (!this.view.state.noLoadDefault && model.loadDefault) {
      this.load();
    }
  }

  async call(
    key: keyof IApiPickupTreeViewCall,
    args: IData | undefined,
  ): Promise<IData | null | undefined> {
    if (key === ViewCallTag.GET_ALL_DATA) {
      return this.tree.state.items;
    }
    return super.call(key, args);
  }
}
