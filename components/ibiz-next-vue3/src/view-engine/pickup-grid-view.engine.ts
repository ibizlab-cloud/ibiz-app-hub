import {
  ViewController,
  IPickupGridViewEvent,
  IPickupGridViewState,
  IGridController,
  ViewCallTag,
  IApiPickupGridViewCall,
} from '@ibiz-template/runtime';
// import { IAppDEPickupGridView } from '@ibiz/model-core';
import { IAppDEGridView } from '@ibiz/model-core';
import { GridViewEngine } from './grid-view.engine';
// todo 缺失 IAppDEPickupGridView
export class PickupGridViewEngine extends GridViewEngine {
  protected declare view: ViewController<
    IAppDEGridView,
    IPickupGridViewState,
    IPickupGridViewEvent
  >;

  /**
   * 表格控制器
   *
   * @author zk
   * @date 2023-05-26 05:05:43
   * @readonly
   * @memberof PickupGridViewEngine
   */
  get grid(): IGridController {
    return this.view.getController('grid') as IGridController;
  }

  async onCreated(): Promise<void> {
    super.onCreated();
    const { model } = this.view;
    if (!this.view.slotProps.grid) {
      this.view.slotProps.grid = {};
    }
    this.view.slotProps.grid.singleSelect = this.view.state.singleSelect;
    this.view.slotProps.grid.mdctrlActiveMode = model.gridRowActiveMode!;
  }

  async onMounted(): Promise<void> {
    await super.onMounted();
    this.xdataControl.evt.on('onSelectionChange', async event => {
      this.view.evt.emit('onSelectionChange', { ...event });
    });
    this.xdataControl.evt.on('onActive', async event => {
      this.view.evt.emit('onDataActive', { ...event });
    });
  }

  async call(
    key: keyof IApiPickupGridViewCall,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    args: any,
  ): Promise<IData | null | undefined> {
    if (key === ViewCallTag.GET_ALL_DATA) {
      return this.grid.state.items;
    }
    return super.call(key, args);
  }
}
