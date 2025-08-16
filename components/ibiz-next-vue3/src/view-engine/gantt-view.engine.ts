import { RuntimeError } from '@ibiz-template/core';
import {
  MDViewEngine,
  ViewController,
  IGanttViewState,
  IGanttViewEvent,
  IGanttController,
  SysUIActionTag,
  EventBase,
  IApiGanttViewCall,
} from '@ibiz-template/runtime';
import { IAppDEGanttView } from '@ibiz/model-core';

export class GanttViewEngine extends MDViewEngine {
  protected declare view: ViewController<
    IAppDEGanttView,
    IGanttViewState,
    IGanttViewEvent
  >;

  get gantt(): IGanttController {
    return this.view.getController('gantt') as IGanttController;
  }

  async call(
    key: keyof IApiGanttViewCall,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    args: any,
  ): Promise<IData | null | undefined> {
    if (key === SysUIActionTag.NEW_ROW) {
      this.gantt.newRow(args);
      return null;
    }
    if (key === SysUIActionTag.TOGGLE_ROW_EDIT) {
      this.gantt.toggleRowEdit();
      return null;
    }
    if (key === SysUIActionTag.SAVE_ROW) {
      this.gantt.save(args.data[0]);
      return null;
    }
    if (key === SysUIActionTag.SAVE) {
      this.gantt.saveAll();
      return null;
    }
    if (key === SysUIActionTag.EXPAND) {
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || '';
      if (!tag) {
        const { selectedData } = this.gantt.state;
        const selectedGroup = selectedData.filter(x => !x._leaf);
        if (selectedGroup.length > 0) {
          tag = selectedGroup[0].srfnodeid;
        }
      }
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t('viewEngine.noExpandTag'));
      }
      this.gantt.changeCollapse({ tag, expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSE) {
      const { srfcollapsetag } = args.params || {};
      let tag = srfcollapsetag || '';
      if (!tag) {
        const { selectedData } = this.gantt.state;
        const selectedGroup = selectedData.filter(x => !x._leaf);
        if (selectedGroup.length > 0) {
          tag = selectedGroup[0].srfnodeid;
        }
      }
      if (!tag) {
        throw new RuntimeError(ibiz.i18n.t('viewEngine.noCollapseTag'));
      }
      this.gantt.changeCollapse({ tag, expand: false });
      return null;
    }
    if (key === SysUIActionTag.EXPANDALL) {
      this.gantt.changeCollapse({ expand: true });
      return null;
    }
    if (key === SysUIActionTag.COLLAPSEALL) {
      this.gantt.changeCollapse({ expand: false });
      return null;
    }
    return super.call(key, args);
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  protected async onXDataActive(event: EventBase): Promise<void> {
    // 甘特图 opendata 逻辑由部件执行
  }

  async onCreated(): Promise<void> {
    super.onCreated();
    const { model } = this.view;
    if (!this.view.slotProps.gantt) {
      this.view.slotProps.gantt = {};
    }
    this.view.slotProps.gantt.mdctrlActiveMode = model.mdctrlActiveMode!;
  }
}
