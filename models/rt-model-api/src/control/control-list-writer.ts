import { ModelListWriterBase } from '../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';

export class ControlListWriter extends ModelListWriterBase {
  onFillDSLList(c: IModelDSLGenEngineContext, src: any[], dst: any[]): void {
    const _ = this;
    src.forEach(item => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
    //super.onFillDSLList(context, src, dst)
  }

  onFillDSL(c: IModelDSLGenEngineContext, src: any, dst: any): void {
    switch (src['controlType']) {
      case 'APPMENU':
        c.fillDSL('control.menu.AppMenu', src, dst);
        return;
      case 'CALENDAR':
        c.fillDSL('control.calendar.SysCalendar', src, dst);
        return;
      case 'CALENDAREXPBAR':
        c.fillDSL('control.expbar.CalendarExpBar', src, dst);
        return;
      case 'CAPTIONBAR':
        c.fillDSL('control.captionbar.CaptionBar', src, dst);
        return;
      case 'CHART':
        c.fillDSL('control.chart.DEChart', src, dst);
        return;
      case 'CHARTEXPBAR':
        c.fillDSL('control.expbar.ChartExpBar', src, dst);
        return;
      case 'CONTEXTMENU':
        c.fillDSL('control.toolbar.DEContextMenu', src, dst);
        return;
      case 'CUSTOM':
        c.fillDSL('control.custom.CustomControl', src, dst);
        return;
      case 'DASHBOARD':
        c.fillDSL('control.dashboard.SysDashboard', src, dst);
        return;
      case 'DATAINFOBAR':
        c.fillDSL('control.datainfobar.DataInfoBar', src, dst);
        return;
      case 'DATAVIEW':
        c.fillDSL('control.dataview.DEDataView', src, dst);
        return;
      case 'DATAVIEWEXPBAR':
        c.fillDSL('control.expbar.DataViewExpBar', src, dst);
        return;
      case 'DRBAR':
        c.fillDSL('control.drctrl.DEDRBar', src, dst);
        return;
      case 'DRTAB':
        c.fillDSL('control.drctrl.DEDRTab', src, dst);
        return;
      case 'EXPBAR':
        c.fillDSL('control.expbar.ExpBar', src, dst);
        return;
      case 'FORM':
        c.fillDSL('control.form.DEEditForm', src, dst);
        return;
      case 'GANTT':
        c.fillDSL('control.tree.DEGantt', src, dst);
        return;
      case 'GANTTEXPBAR':
        c.fillDSL('control.expbar.GanttExpBar', src, dst);
        return;
      case 'GRID':
        c.fillDSL('control.grid.DEGrid', src, dst);
        return;
      case 'GRIDEXPBAR':
        c.fillDSL('control.expbar.GridExpBar', src, dst);
        return;
      case 'KANBAN':
        c.fillDSL('control.dataview.DEKanban', src, dst);
        return;
      case 'LIST':
        c.fillDSL('control.list.DEList', src, dst);
        return;
      case 'LISTEXPBAR':
        c.fillDSL('control.expbar.ListExpBar', src, dst);
        return;
      case 'MAP':
        c.fillDSL('control.map.SysMap', src, dst);
        return;
      case 'MAPEXPBAR':
        c.fillDSL('control.expbar.MapExpBar', src, dst);
        return;
      case 'MOBMDCTRL':
        c.fillDSL('control.list.DEMobMDCtrl', src, dst);
        return;
      case 'MULTIEDITVIEWPANEL':
        c.fillDSL('control.grid.DEMultiEditViewPanel', src, dst);
        return;
      case 'PANEL':
        c.fillDSL('control.panel.SysPanel', src, dst);
        return;
      case 'PICKUPVIEWPANEL':
        c.fillDSL('control.viewpanel.DEPickupViewPanel', src, dst);
        return;
      case 'PORTLET':
        c.fillDSL('control.dashboard.DBPortletPart[]', src, dst);
        return;
      case 'REPORTPANEL':
        c.fillDSL('control.reportpanel.DEReportPanel', src, dst);
        return;
      case 'SEARCHBAR':
        c.fillDSL('control.searchbar.SysSearchBar', src, dst);
        return;
      case 'SEARCHFORM':
        c.fillDSL('control.form.DESearchForm', src, dst);
        return;
      case 'STATEWIZARDPANEL':
        c.fillDSL('control.wizardpanel.DEStateWizardPanel', src, dst);
        return;
      case 'TABEXPPANEL':
        c.fillDSL('control.expbar.TabExpPanel', src, dst);
        return;
      case 'TABVIEWPANEL':
        c.fillDSL('control.viewpanel.DETabViewPanel', src, dst);
        return;
      case 'TOOLBAR':
        c.fillDSL('control.toolbar.DEToolbar', src, dst);
        return;
      case 'TREEEXPBAR':
        c.fillDSL('control.expbar.TreeExpBar', src, dst);
        return;
      case 'TREEGRID':
        c.fillDSL('control.grid.DETreeGrid', src, dst);
        return;
      case 'TREEGRIDEX':
        c.fillDSL('control.tree.DETreeGridEx', src, dst);
        return;
      case 'TREEVIEW':
        c.fillDSL('control.tree.DETree', src, dst);
        return;
      case 'VIEWLAYOUTPANEL':
        c.fillDSL('control.panel.SysViewLayoutPanel', src, dst);
        return;
      case 'VIEWPANEL':
        c.fillDSL('control.viewpanel.DEViewPanel', src, dst);
        return;
      case 'WFEXPBAR':
        c.fillDSL('control.expbar.WFExpBar', src, dst);
        return;
      case 'WIZARDPANEL':
        c.fillDSL('control.wizardpanel.DEWizardPanel', src, dst);
        return;
    }

    //super.onFillDSL(context, src, dst)
  }
}
