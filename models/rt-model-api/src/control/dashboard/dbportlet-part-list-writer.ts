import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class DBPortletPartListWriter extends ModelListWriterBase {
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
    switch (src['portletType']) {
      case 'APPMENU':
        c.fillDSL('control.dashboard.DBAppMenuPortletPart', src, dst);
        return;
      case 'CHART':
        c.fillDSL('control.dashboard.DBChartPortletPart', src, dst);
        return;
      case 'CONTAINER':
        c.fillDSL('control.dashboard.DBContainerPortletPart', src, dst);
        return;
      case 'CUSTOM':
        c.fillDSL('control.dashboard.DBCustomPortletPart', src, dst);
        return;
      case 'FILTER':
        c.fillDSL('control.dashboard.DBFilterPortletPart', src, dst);
        return;
      case 'HTML':
        c.fillDSL('control.dashboard.DBHtmlPortletPart', src, dst);
        return;
      case 'LIST':
        c.fillDSL('control.dashboard.DBListPortletPart', src, dst);
        return;
      case 'RAWITEM':
        c.fillDSL('control.dashboard.DBRawItemPortletPart', src, dst);
        return;
      case 'REPORT':
        c.fillDSL('control.dashboard.DBReportPortletPart', src, dst);
        return;
      case 'TOOLBAR':
        c.fillDSL('control.dashboard.DBToolbarPortletPart', src, dst);
        return;
      case 'VIEW':
        c.fillDSL('control.dashboard.DBViewPortletPart', src, dst);
        return;
    }
    c.fillDSL('control.dashboard.DBPortletPart', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
