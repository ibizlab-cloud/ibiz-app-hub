import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class AppDEViewListWriter extends ModelListWriterBase {
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
    switch (src['viewType']) {
      case 'DECALENDAREXPVIEW':
        c.fillDSL('app.view.AppDECalendarExplorerView', src, dst);
        return;
      case 'DECALENDARVIEW':
      case 'DECALENDARVIEW9':
        c.fillDSL('app.view.AppDECalendarView', src, dst);
        return;
      case 'DECHARTEXPVIEW':
        c.fillDSL('app.view.AppDEChartExplorerView', src, dst);
        return;
      case 'DECHARTVIEW':
      case 'DECHARTVIEW9':
        c.fillDSL('app.view.AppDEChartView', src, dst);
        return;
      case 'DECUSTOMVIEW':
        c.fillDSL('app.view.AppDECustomView', src, dst);
        return;
      case 'DEDATAVIEW':
      case 'DEDATAVIEW9':
        c.fillDSL('app.view.AppDEDataView', src, dst);
        return;
      case 'DEDATAVIEWEXPVIEW':
        c.fillDSL('app.view.AppDEDataViewExplorerView', src, dst);
        return;
      case 'DEEDITVIEW':
      case 'DEEDITVIEW2':
      case 'DEEDITVIEW3':
      case 'DEEDITVIEW4':
      case 'DEOPTVIEW':
        c.fillDSL('app.view.AppDEEditView', src, dst);
        return;
      case 'DEEDITVIEW9':
        c.fillDSL('app.view.AppDEEditView9', src, dst);
        return;
      case 'DEFORMPICKUPDATAVIEW':
        c.fillDSL('app.view.AppDEFormPickupDataView', src, dst);
        return;
      case 'DEGANTTEXPVIEW':
        c.fillDSL('app.view.AppDEGanttExplorerView', src, dst);
        return;
      case 'DEGANTTVIEW':
      case 'DEGANTTVIEW9':
        c.fillDSL('app.view.AppDEGanttView', src, dst);
        return;
      case 'DEGRIDEXPVIEW':
        c.fillDSL('app.view.AppDEGridExplorerView', src, dst);
        return;
      case 'DEGRIDVIEW':
      case 'DEGRIDVIEW2':
      case 'DEGRIDVIEW4':
        c.fillDSL('app.view.AppDEGridView', src, dst);
        return;
      case 'DEGRIDVIEW8':
        c.fillDSL('app.view.AppDEGridView8', src, dst);
        return;
      case 'DEGRIDVIEW9':
        c.fillDSL('app.view.AppDEGridView9', src, dst);
        return;
      case 'DEHTMLVIEW':
        c.fillDSL('app.view.AppDEHtmlView', src, dst);
        return;
      case 'DEINDEXPICKUPDATAVIEW':
        c.fillDSL('app.view.AppDEIndexPickupDataView', src, dst);
        return;
      case 'DEINDEXVIEW':
        c.fillDSL('app.view.AppDEIndexView', src, dst);
        return;
      case 'DEKANBANVIEW':
      case 'DEKANBANVIEW9':
        c.fillDSL('app.view.AppDEKanbanView', src, dst);
        return;
      case 'DELISTEXPVIEW':
        c.fillDSL('app.view.AppDEListExplorerView', src, dst);
        return;
      case 'DELISTVIEW':
      case 'DELISTVIEW9':
        c.fillDSL('app.view.AppDEListView', src, dst);
        return;
      case 'DEMAPEXPVIEW':
        c.fillDSL('app.view.AppDEMapExplorerView', src, dst);
        return;
      case 'DEMAPVIEW':
      case 'DEMAPVIEW9':
        c.fillDSL('app.view.AppDEMapView', src, dst);
        return;
      case 'DEMDCUSTOMVIEW':
        c.fillDSL('app.view.AppDEMultiDataView2', src, dst);
        return;
      case 'DEMEDITVIEW9':
        c.fillDSL('app.view.AppDEMEditView', src, dst);
        return;
      case 'DEMOBCALENDAREXPVIEW':
        c.fillDSL('app.view.AppDEMobCalendarExplorerView', src, dst);
        return;
      case 'DEMOBCALENDARVIEW':
      case 'DEMOBCALENDARVIEW9':
        c.fillDSL('app.view.AppDEMobCalendarView', src, dst);
        return;
      case 'DEMOBCHARTEXPVIEW':
        c.fillDSL('app.view.AppDEMobChartExplorerView', src, dst);
        return;
      case 'DEMOBCHARTVIEW':
      case 'DEMOBCHARTVIEW9':
        c.fillDSL('app.view.AppDEMobChartView', src, dst);
        return;
      case 'DEMOBCUSTOMVIEW':
        c.fillDSL('app.view.AppDEMobCustomView', src, dst);
        return;
      case 'DEMOBDATAVIEW':
        c.fillDSL('app.view.AppDEMobDataView', src, dst);
        return;
      case 'DEMOBDATAVIEWEXPVIEW':
        c.fillDSL('app.view.AppDEMobDataViewExplorerView', src, dst);
        return;
      case 'DEMOBEDITVIEW':
      case 'DEMOBEDITVIEW3':
      case 'DEMOBEDITVIEW9':
      case 'DEMOBOPTVIEW':
        c.fillDSL('app.view.AppDEMobEditView', src, dst);
        return;
      case 'DEMOBFORMPICKUPMDVIEW':
      case 'DEMOBINDEXPICKUPMDVIEW':
      case 'DEMOBPICKUPMDVIEW':
        c.fillDSL('app.view.AppDEMobPickupMDView', src, dst);
        return;
      case 'DEMOBGANTTEXPVIEW':
        c.fillDSL('app.view.AppDEMobGanttExplorerView', src, dst);
        return;
      case 'DEMOBGANTTVIEW':
      case 'DEMOBGANTTVIEW9':
        c.fillDSL('app.view.AppDEMobGanttView', src, dst);
        return;
      case 'DEMOBHTMLVIEW':
        c.fillDSL('app.view.AppDEMobHtmlView', src, dst);
        return;
      case 'DEMOBLISTEXPVIEW':
        c.fillDSL('app.view.AppDEMobListExplorerView', src, dst);
        return;
      case 'DEMOBLISTVIEW':
        c.fillDSL('app.view.AppDEMobListView', src, dst);
        return;
      case 'DEMOBMAPEXPVIEW':
        c.fillDSL('app.view.AppDEMobMapExplorerView', src, dst);
        return;
      case 'DEMOBMAPVIEW':
      case 'DEMOBMAPVIEW9':
        c.fillDSL('app.view.AppDEMobMapView', src, dst);
        return;
      case 'DEMOBMDVIEW':
      case 'DEMOBMDVIEW9':
        c.fillDSL('app.view.AppDEMobMDView', src, dst);
        return;
      case 'DEMOBMEDITVIEW9':
        c.fillDSL('app.view.AppDEMobMEditView', src, dst);
        return;
      case 'DEMOBMPICKUPVIEW':
        c.fillDSL('app.view.AppDEMobMPickupView', src, dst);
        return;
      case 'DEMOBPANELVIEW':
      case 'DEMOBPANELVIEW9':
        c.fillDSL('app.view.AppDEMobPanelView', src, dst);
        return;
      case 'DEMOBPICKUPLISTVIEW':
        c.fillDSL('app.view.AppDEMobPickupListView', src, dst);
        return;
      case 'DEMOBPICKUPTREEVIEW':
        c.fillDSL('app.view.AppDEMobPickupTreeView', src, dst);
        return;
      case 'DEMOBPICKUPVIEW':
        c.fillDSL('app.view.AppDEMobPickupView', src, dst);
        return;
      case 'DEMOBPORTALVIEW':
      case 'DEMOBPORTALVIEW9':
        c.fillDSL('app.view.AppDEMobDashboardView', src, dst);
        return;
      case 'DEMOBREDIRECTVIEW':
        c.fillDSL('app.view.AppDEMobRedirectView', src, dst);
        return;
      case 'DEMOBREPORTVIEW':
        c.fillDSL('app.view.AppDEMobReportView', src, dst);
        return;
      case 'DEMOBTABEXPVIEW':
      case 'DEMOBTABEXPVIEW9':
        c.fillDSL('app.view.AppDEMobTabExplorerView', src, dst);
        return;
      case 'DEMOBTABSEARCHVIEW':
      case 'DEMOBTABSEARCHVIEW9':
        c.fillDSL('app.view.AppDEMobTabSearchView', src, dst);
        return;
      case 'DEMOBTREEEXPVIEW':
      case 'DEMOBTREEEXPVIEW9':
        c.fillDSL('app.view.AppDEMobTreeExplorerView', src, dst);
        return;
      case 'DEMOBTREEVIEW':
        c.fillDSL('app.view.AppDEMobTreeView', src, dst);
        return;
      case 'DEMOBWFACTIONVIEW':
        c.fillDSL('app.view.AppDEMobWFActionView', src, dst);
        return;
      case 'DEMOBWFDATAREDIRECTVIEW':
        c.fillDSL('app.view.AppDEMobWFDataRedirectView', src, dst);
        return;
      case 'DEMOBWFDYNAACTIONVIEW':
        c.fillDSL('app.view.AppDEMobWFDynaActionView', src, dst);
        return;
      case 'DEMOBWFDYNAEDITVIEW':
      case 'DEMOBWFDYNAEDITVIEW3':
        c.fillDSL('app.view.AppDEMobWFDynaEditView', src, dst);
        return;
      case 'DEMOBWFDYNAEXPMDVIEW':
        c.fillDSL('app.view.AppDEMobWFDynaExpMDView', src, dst);
        return;
      case 'DEMOBWFDYNASTARTVIEW':
        c.fillDSL('app.view.AppDEMobWFDynaStartView', src, dst);
        return;
      case 'DEMOBWFEDITVIEW':
      case 'DEMOBWFEDITVIEW3':
        c.fillDSL('app.view.AppDEMobWFEditView', src, dst);
        return;
      case 'DEMOBWFMDVIEW':
        c.fillDSL('app.view.AppDEMobWFMDView', src, dst);
        return;
      case 'DEMOBWFPROXYRESULTVIEW':
        c.fillDSL('app.view.AppDEMobWFProxyResultView', src, dst);
        return;
      case 'DEMOBWFPROXYSTARTVIEW':
        c.fillDSL('app.view.AppDEMobWFProxyStartView', src, dst);
        return;
      case 'DEMOBWFSTARTVIEW':
        c.fillDSL('app.view.AppDEMobWFStartView', src, dst);
        return;
      case 'DEMOBWIZARDVIEW':
        c.fillDSL('app.view.AppDEMobWizardView', src, dst);
        return;
      case 'DEMPICKUPVIEW':
      case 'DEMPICKUPVIEW2':
        c.fillDSL('app.view.AppDEMPickupView', src, dst);
        return;
      case 'DEPANELVIEW':
      case 'DEPANELVIEW9':
        c.fillDSL('app.view.AppDEPanelView', src, dst);
        return;
      case 'DEPICKUPDATAVIEW':
        c.fillDSL('app.view.AppDEPickupDataView', src, dst);
        return;
      case 'DEPICKUPGRIDVIEW':
        c.fillDSL('app.view.AppDEPickupGridView', src, dst);
        return;
      case 'DEPICKUPTREEVIEW':
        c.fillDSL('app.view.AppDEPickupTreeView', src, dst);
        return;
      case 'DEPICKUPVIEW':
      case 'DEPICKUPVIEW2':
      case 'DEPICKUPVIEW3':
        c.fillDSL('app.view.AppDEPickupView', src, dst);
        return;
      case 'DEPORTALVIEW':
      case 'DEPORTALVIEW9':
        c.fillDSL('app.view.AppDEDashboardView', src, dst);
        return;
      case 'DEREDIRECTVIEW':
        c.fillDSL('app.view.AppDERedirectView', src, dst);
        return;
      case 'DEREPORTVIEW':
        c.fillDSL('app.view.AppDEReportView', src, dst);
        return;
      case 'DESUBAPPREFVIEW':
        c.fillDSL('app.view.AppDESubAppRefView', src, dst);
        return;
      case 'DETABEXPVIEW':
      case 'DETABEXPVIEW9':
        c.fillDSL('app.view.AppDETabExplorerView', src, dst);
        return;
      case 'DETABSEARCHVIEW':
      case 'DETABSEARCHVIEW9':
        c.fillDSL('app.view.AppDETabSearchView', src, dst);
        return;
      case 'DETREEEXPVIEW':
      case 'DETREEEXPVIEW3':
        c.fillDSL('app.view.AppDETreeExplorerView', src, dst);
        return;
      case 'DETREEEXPVIEW2':
        c.fillDSL('app.view.AppDETreeExplorerView2', src, dst);
        return;
      case 'DETREEGRIDEXVIEW':
      case 'DETREEGRIDEXVIEW9':
        c.fillDSL('app.view.AppDETreeGridExView', src, dst);
        return;
      case 'DETREEGRIDVIEW':
      case 'DETREEGRIDVIEW9':
        c.fillDSL('app.view.AppDETreeGridView', src, dst);
        return;
      case 'DETREEVIEW':
      case 'DETREEVIEW9':
        c.fillDSL('app.view.AppDETreeView', src, dst);
        return;
      case 'DEWFACTIONVIEW':
        c.fillDSL('app.view.AppDEWFActionView', src, dst);
        return;
      case 'DEWFDATAREDIRECTVIEW':
        c.fillDSL('app.view.AppDEWFDataRedirectView', src, dst);
        return;
      case 'DEWFDYNAACTIONVIEW':
        c.fillDSL('app.view.AppDEWFDynaActionView', src, dst);
        return;
      case 'DEWFDYNAEDITVIEW':
      case 'DEWFDYNAEDITVIEW3':
        c.fillDSL('app.view.AppDEWFDynaEditView', src, dst);
        return;
      case 'DEWFDYNAEXPGRIDVIEW':
        c.fillDSL('app.view.AppDEWFDynaExpGridView', src, dst);
        return;
      case 'DEWFDYNASTARTVIEW':
        c.fillDSL('app.view.AppDEWFDynaStartView', src, dst);
        return;
      case 'DEWFEDITPROXYDATAVIEW':
        c.fillDSL('app.view.AppDEWFEditProxyDataView', src, dst);
        return;
      case 'DEWFEDITVIEW':
      case 'DEWFEDITVIEW2':
      case 'DEWFEDITVIEW3':
      case 'DEWFEDITVIEW9':
        c.fillDSL('app.view.AppDEWFEditView', src, dst);
        return;
      case 'DEWFEXPVIEW':
        c.fillDSL('app.view.AppDEWFExplorerView', src, dst);
        return;
      case 'DEWFGRIDVIEW':
        c.fillDSL('app.view.AppDEWFGridView', src, dst);
        return;
      case 'DEWFPROXYDATAREDIRECTVIEW':
        c.fillDSL('app.view.AppDEWFProxyDataRedirectView', src, dst);
        return;
      case 'DEWFPROXYDATAVIEW':
        c.fillDSL('app.view.AppDEWFProxyDataView', src, dst);
        return;
      case 'DEWFPROXYRESULTVIEW':
        c.fillDSL('app.view.AppDEWFProxyResultView', src, dst);
        return;
      case 'DEWFPROXYSTARTVIEW':
        c.fillDSL('app.view.AppDEWFProxyStartView', src, dst);
        return;
      case 'DEWFSTARTVIEW':
        c.fillDSL('app.view.AppDEWFStartView', src, dst);
        return;
      case 'DEWIZARDVIEW':
        c.fillDSL('app.view.AppDEWizardView', src, dst);
        return;
    }
    c.fillDSL('app.view.AppDEView', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
