import {
  ViewController,
  IPickupTreeViewEvent,
  IPickupTreeViewState,
  ITreeController,
} from '@ibiz-template/runtime';
import { IAppDEMobTreeView } from '@ibiz/model-core';
import { MobTreeViewEngine } from './mob-tree-view.engine';

export class MobPickupTreeViewEngine extends MobTreeViewEngine {
  protected declare view: ViewController<
    IAppDEMobTreeView,
    IPickupTreeViewState,
    IPickupTreeViewEvent
  >;

  /**
   * 多数据部件名称
   *
   * @author zk
   * @date 2023-06-28 09:06:55
   * @readonly
   * @memberof MobPickupTreeViewEngine
   */
  get xdataControlName(): string {
    return 'tree';
  }

  get tree(): ITreeController {
    return this.view.getController('tree') as ITreeController;
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
    this.xdataControl.evt.on('onSelectionChange', async event => {
      this.view.evt.emit('onSelectionChange', { ...event });
    });
    this.xdataControl.evt.on('onActive', async event => {
      this.view.evt.emit('onDataActive', { ...event });
    });
    // 默认加载
    if (model.loadDefault) {
      this.load();
    }
  }

  /**
   * 创建完成
   *
   * @author zk
   * @date 2023-07-03 10:07:28
   * @memberof MobPickupTreeViewEngine
   */
  async onCreated(): Promise<void> {
    super.onCreated();
    if (!this.view.slotProps.tree) {
      this.view.slotProps.tree = {};
    }
    this.view.slotProps.tree.singleSelect = this.view.state.singleSelect;
  }
}
