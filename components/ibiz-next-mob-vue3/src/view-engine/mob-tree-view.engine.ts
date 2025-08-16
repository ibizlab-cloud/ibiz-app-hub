import {
  ViewController,
  ITreeViewEvent,
  ITreeViewState,
  MDViewEngine,
  ITreeController,
} from '@ibiz-template/runtime';
import { IAppDEMobTreeView } from '@ibiz/model-core';

export class MobTreeViewEngine extends MDViewEngine {
  protected declare view: ViewController<
    IAppDEMobTreeView,
    ITreeViewState,
    ITreeViewEvent
  >;

  get tree(): ITreeController {
    return this.view.getController('tree') as ITreeController;
  }

  async onCreated(): Promise<void> {
    await super.onCreated();
    if (!this.view.slotProps.tree) {
      this.view.slotProps.tree = {};
    }
  }
}
