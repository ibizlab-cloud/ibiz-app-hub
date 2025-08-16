import {
  ViewController,
  ITreeViewEvent,
  ITreeViewState,
  MDViewEngine,
  ITreeController,
  SysUIActionTag,
  IApiTreeViewCall,
} from '@ibiz-template/runtime';
import { RuntimeError } from '@ibiz-template/core';
import { IAppDETreeView } from '@ibiz/model-core';

export class TreeViewEngine extends MDViewEngine {
  protected declare view: ViewController<
    IAppDETreeView,
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

  async call(
    key: keyof IApiTreeViewCall,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    args: any,
  ): Promise<IData | null | undefined> {
    if (key === SysUIActionTag.REFRESH_ALL) {
      await this.tree.refresh();
      return null;
    }
    // 有数据刷新子节点，没数据刷新所有
    if (key === SysUIActionTag.REFRESH) {
      if (args?.data?.[0]) {
        await this.tree.refreshNodeChildren(args.data[0], false);
      } else {
        await this.tree.refresh();
      }
      return null;
    }
    if (key === SysUIActionTag.REFRESH_PARENT) {
      await this.tree.refreshNodeChildren(args.data[0], true);
      return null;
    }
    if (key === SysUIActionTag.EXPAND) {
      const { data = [] } = args;
      const { srfcollapsetag } = args.params || {};
      let tag: string = srfcollapsetag || '';
      if (!tag && data.length > 0) {
        tag = data[0].srfnodeid;
      }
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t('viewEngine.noExpandTag'));
      }
      this.tree.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSE) {
      const { data = [] } = args;
      const { srfcollapsetag } = args.params || {};
      let tag: string = srfcollapsetag || '';
      if (!tag && data.length > 0) {
        tag = data[0].srfnodeid;
      }
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t('viewEngine.noCollapseTag'));
      }
      this.tree.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === SysUIActionTag.EXPANDALL) {
      this.tree.changeCollapse({ expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSEALL) {
      this.tree.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }
}
